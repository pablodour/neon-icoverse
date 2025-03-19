
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { universeData, Artist, TreeNode } from '@/utils/data';
import { 
  calculateRadialTreeLayout, 
  project, 
  generateLinkPath,
  zoomToNode,
  resetZoom
} from '@/utils/visualizationUtils';
import ArtistProfile from './ArtistProfile';

const Universe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        // Reset the transform to center the visualization
        setTransform({ 
          x: width / 2, 
          y: height / 2, 
          k: 1 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create and update visualization
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    // Clear previous visualization
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create the group that will be transformed
    const g = svg.append('g')
      .attr('transform', `translate(${transform.x},${transform.y}) scale(${transform.k})`);

    // Calculate the layout
    const root = calculateRadialTreeLayout(
      universeData,
      dimensions.width,
      dimensions.height
    );

    // Draw links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => generateLinkPath(d.source, d.target))
      .attr('fill', 'none')
      .attr('stroke', d => 
        (highlightedNode && (d.source.data.id === highlightedNode || d.target.data.id === highlightedNode))
          ? '#39FF14'
          : 'rgba(255, 255, 255, 0.3)'
      )
      .attr('stroke-width', d => 
        (highlightedNode && (d.source.data.id === highlightedNode || d.target.data.id === highlightedNode))
          ? 2
          : 1
      )
      .classed('link-draw', true);

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', d => `node node-${d.data.id}`)
      .attr('transform', d => {
        const [x, y] = project(d.x, d.y);
        return `translate(${x},${y})`;
      })
      .classed('node-enter', true);

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', d => d.data.artists ? 8 : 6)
      .attr('fill', d => {
        if (highlightedNode === d.data.id) return '#39FF14';
        return d.data.artists ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
      })
      .attr('stroke', d => {
        if (highlightedNode === d.data.id) return '#39FF14';
        return d.data.artists ? 'rgba(57, 255, 20, 0.7)' : 'transparent';
      })
      .attr('stroke-width', 2)
      .attr('class', 'transition-all duration-300')
      .on('mouseover', (event, d) => {
        setHighlightedNode(d.data.id);
      })
      .on('mouseout', () => {
        setHighlightedNode(null);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        if (d.data.artists && d.data.artists.length > 0) {
          setSelectedArtist(d.data.artists[0]);
        } else {
          // Zoom to the node when clicked
          zoomToNode(d, dimensions.width, dimensions.height, setTransform);
        }
      });

    // Add node labels
    nodes.append('text')
      .attr('dy', d => d.children ? -15 : 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', d => 
        highlightedNode === d.data.id ? '#39FF14' : 'rgba(255, 255, 255, 0.9)'
      )
      .text(d => d.data.name)
      .attr('pointer-events', 'none');

    // Add click handler to the background to reset zoom
    svg.on('click', () => {
      resetZoom(dimensions.width, dimensions.height, setTransform);
    });

  }, [dimensions, transform, highlightedNode]);

  return (
    <section id="universe" className="min-h-screen bg-dark py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Universe</h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            Explore our ecosystem of artists through this interactive visualization. 
            Click on nodes to navigate and discover artists in our universe.
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="w-full h-[600px] rounded-lg glassmorphism overflow-hidden"
          aria-label="Interactive artist universe visualization"
        >
          <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height}
            className="w-full h-full"
          />
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => resetZoom(dimensions.width, dimensions.height, setTransform)}
            className="px-4 py-2 border border-neon/50 rounded-md hover:bg-neon/10 transition-all duration-300"
            aria-label="Reset visualization zoom"
          >
            Reset View
          </button>
        </div>
      </div>
      
      {selectedArtist && (
        <ArtistProfile 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}
    </section>
  );
};

export default Universe;
