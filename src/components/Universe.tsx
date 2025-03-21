import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { universeData, Artist } from '@/utils/data';
import ArtistProfile from './ArtistProfile';

const Universe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

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
      .on('click', (_, d) => {
        if (d.data.artists) setSelectedArtist(d.data.artists[0]);
      });

    node.append('circle')
      .attr('r', d => d.depth === 0 ? 16 : d.data.artists ? 12 : 6)
      .attr('fill', d => d.depth === 0 ? '#39FF14' : d.data.artists ? '#fff' : 'rgba(255,255,255,0.6)')
      .attr('stroke', 'rgba(255,255,255,0.8)')
      .attr('stroke-width', 2);

    node.filter(d => d.depth === 0)
      .append('image')
      .attr('xlink:href', '/icon-central-node.svg') // Custom icon path
      .attr('x', -12)
      .attr('y', -12)
      .attr('width', 24)
      .attr('height', 24);

    node.filter(d => d.data.artists)
      .append('image')
      .attr('xlink:href', d => d.data.artists[0].imageUrl)
      .attr('x', -10)
      .attr('y', -10)
      .attr('width', 20)
      .attr('height', 20)
      .attr('clip-path', 'circle(10px)');

    node.filter(d => !d.data.artists && d.depth !== 0)
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 8 : -8))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .text(d => d.data.name);

  }, [dimensions]);

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
    </section>
  );
};

export default Universe;
