
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { universeData, Artist, TreeNode } from '@/utils/data';
import ArtistProfile from './ArtistProfile';
import { Lightbulb, Shield, HelpCircle } from 'lucide-react';

const Universe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showBadHabitsInfo, setShowBadHabitsInfo] = useState(false);
  const [showNodeInfo, setShowNodeInfo] = useState<{id: string, name: string, info: string} | null>(null);

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

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [-dimensions.width / 2, -dimensions.height / 2, dimensions.width, dimensions.height]);

    svg.selectAll('*').remove();

    const root = d3.hierarchy(universeData);
    const treeLayout = d3.tree().size([2 * Math.PI, Math.min(dimensions.width, dimensions.height) / 2 - 150]);
    treeLayout(root);

    const zoom = d3.zoom().scaleExtent([0.5, 3]).on('zoom', (event) => {
      svg.select('g').attr('transform', event.transform);
    });

    svg.call(zoom);

    const g = svg.append('g');

    g.selectAll('path')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('d', d3.linkRadial().angle(d => d.x).radius(d => d.y));

    const node = g.selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
      .attr('class', 'cursor-pointer')
      .on('mouseover', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('stroke', '#39FF14')
          .attr('stroke-width', 3)
          .attr('filter', 'drop-shadow(0 0 6px rgba(57,255,20,0.6))');
      })
      .on('mouseout', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('stroke', 'rgba(255,255,255,0.8)')
          .attr('stroke-width', 2)
          .attr('filter', 'none');
      })
      .on('click', (_, d) => {
        const nodeData = d.data as TreeNode;
        if (d.depth === 0) {
          setShowBadHabitsInfo(true);
        } else if (nodeData.artists) {
          setSelectedArtist(nodeData.artists[0]);
        } else if (nodeData.description) {
          setShowNodeInfo({
            id: nodeData.id,
            name: nodeData.name,
            info: nodeData.description
          });
        }
      });

    node.append('circle')
      .attr('r', d => {
        if (d.depth === 0) return 16;
        if (d.data.artists) return 12;
        if (d.data.description) return 14;
        return 6;
      })
      .attr('fill', d => {
        if (d.depth === 0) return '#39FF14';
        if (d.data.artists) return '#fff';
        if (d.data.id === 'vision' || d.data.id === 'rules' || d.data.id === 'faq') return '#39FF14'; // Neon green for vision, rules, faq
        return 'rgba(255,255,255,0.6)';
      })
      .attr('stroke', 'rgba(255,255,255,0.8)')
      .attr('stroke-width', 2);

    node.filter(d => d.depth === 0)
      .append('image')
      .attr('xlink:href', '/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png')
      .attr('x', -12)
      .attr('y', -12)
      .attr('width', 24)
      .attr('height', 24);

    // Vision node with white icon
    node.filter(d => d.data.id === 'vision')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></div>');

    // Rules node with white icon
    node.filter(d => d.data.id === 'rules')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg></div>');

    // FAQ node with white icon
    node.filter(d => d.data.id === 'faq')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>');

    node.filter(d => d.data.artists)
      .append('image')
      .attr('xlink:href', d => d.data.artists[0].imageUrl)
      .attr('x', -10)
      .attr('y', -10)
      .attr('width', 20)
      .attr('height', 20)
      .attr('clip-path', 'circle(10px)');

    node.filter(d => !d.data.artists && d.depth !== 0 && !d.data.description)
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 8 : -8))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .text(d => d.data.name);

    node.filter(d => d.data.description)
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 18 : -18))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.data.name);

  }, [dimensions]);

  const badHabitsInfo = {
    id: "badhabits",
    name: "BAD HABITS",
    info: "BAD HABITS is an interdisciplinary club concept based on different art forms curated on the same dancefloor.",
    imageUrl: "/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png",
    instagramUrl: "https://www.instagram.com/badhabits.oslo/",
    category: "Club Concept",
    subCategory: "Interdisciplinary Arts"
  };

  return (
    <section id="universe" className="min-h-screen bg-dark py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Universe</h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            Explore our ecosystem of artists through this interactive visualization. Click nodes to discover artists.
          </p>
        </div>

        <div ref={containerRef} className="w-full h-[600px] rounded-lg glassmorphism overflow-hidden">
          <svg ref={svgRef} className="w-full h-full" />
        </div>
      </div>

      {selectedArtist && (
        <ArtistProfile artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}

      {showBadHabitsInfo && (
        <ArtistProfile artist={badHabitsInfo} onClose={() => setShowBadHabitsInfo(false)} />
      )}

      {showNodeInfo && (
        <ArtistProfile 
          artist={{
            id: showNodeInfo.id,
            name: showNodeInfo.name.toUpperCase(),
            info: showNodeInfo.info,
            imageUrl: "",
            instagramUrl: "",
            category: "BAD HABITS",
            subCategory: showNodeInfo.name,
            isInfoNode: true
          }} 
          onClose={() => setShowNodeInfo(null)} 
        />
      )}
    </section>
  );
};

export default Universe;
