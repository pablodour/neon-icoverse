
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { universeData, Artist } from '@/utils/data';
import ArtistProfile from './ArtistProfile';

const Universe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
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
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [-dimensions.width / 2, -dimensions.height / 2, dimensions.width, dimensions.height]);
    
    svg.selectAll('*').remove();

    // Create hierarchy and layout
    const root = d3.hierarchy(universeData);
    const treeLayout = d3.tree()
    .size([2 * Math.PI, Math.min(dimensions.width, dimensions.height) / 2 - 100]);  // Added padding

    treeLayout(root);

    // Draw links
    const linkGenerator = d3.linkRadial()
      .angle(d => d.x)
      .radius(d => d.y);

    svg.append('g')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('d', linkGenerator)
      .attr('class', 'link-draw');

    // Draw nodes
    const node = svg.append('g')
  .selectAll('g')
  .data(root.descendants())
  .join('g')
  .attr('transform', d => `
    rotate(${(d.x * 180) / Math.PI - 90}) 
    translate(${d.y},0)
  `)
  .on('click', (event, d) => {
    event.stopPropagation();
    if (d.data.artists && d.data.artists.length > 0) {
      setSelectedArtist(d.data.artists[0]);
    }
  })
  .on('mouseover', function (event, d) {
    d3.select(this).transition()
      .duration(300)
      .attr('transform', `
        rotate(${(d.x * 180) / Math.PI - 90}) 
        translate(${d.y},0) 
        scale(1.1)
      `);
  })
  .on('mouseout', function (event, d) {
    d3.select(this).transition()
      .duration(300)
      .attr('transform', `
        rotate(${(d.x * 180) / Math.PI - 90}) 
        translate(${d.y},0) 
        scale(1)
      `);
  });

// Circle nodes
node.append('circle')
  .attr('r', d => d.data.artists ? 6 : 4)
  .attr('fill', d => d.data.artists ? '#39FF14' : 'rgba(255,255,255,0.8)')
  .attr('stroke', 'white')
  .attr('stroke-width', 1);

// Node labels with improved readability and smaller size
node.append('text')
  .attr('dy', '0.35em')
  .attr('x', d => (d.x < Math.PI === !d.children ? 10 : -10))
  .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
  .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
  .attr('fill', 'white')
  .attr('font-size', '10px')  // Reduced font size
  .text(d => d.data.name);


    // Reset when clicking on background
    svg.on('click', () => {
      // Only reset the view, don't clear selection
    });

  }, [dimensions]);

  return (
    <section id="universe" className="min-h-screen bg-dark py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Universe</h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            Explore our ecosystem of artists through this interactive visualization. 
            Click on nodes to discover artists in our universe.
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
