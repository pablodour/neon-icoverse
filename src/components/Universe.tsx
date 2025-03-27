
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { universeData, Artist, TreeNode } from '@/utils/dataIndex';
import ArtistProfile from './ArtistProfile';
import { 
  Compass, 
  Lightbulb, 
  Shield, 
  HelpCircle,
  Ticket,
  Shirt,
  Heart,
  Accessibility,
  DoorOpen,
  Camera,
  Globe,
  MailSearch
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Universe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<Element, unknown> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showBadHabitsInfo, setShowBadHabitsInfo] = useState(false);
  const [showNodeInfo, setShowNodeInfo] = useState<{ id: string; name: string; info: string; faqItems: any; iconName?: string } | null>(null);

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

    const g = svg.append('g');

    const zoom = d3.zoom<Element, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    zoomRef.current = zoom;
    svg.call(zoom);

    const root = d3.hierarchy(universeData);
    const treeLayout = d3.tree()
      .size([2 * Math.PI, Math.min(dimensions.width, dimensions.height) / 2 - 150]);
    treeLayout(root);

    g.selectAll('path')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y)
      );

    const node = g.selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
      .attr('class', 'cursor-pointer')
      .on('mouseover', function () {
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('stroke', '#39FF14')
          .attr('stroke-width', 3)
          .attr('filter', 'drop-shadow(0 0 6px rgba(57,255,20,0.6))');
      })
      .on('mouseout', function () {
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
            info: nodeData.description,
            faqItems: nodeData.faqItems,
            iconName: nodeData.iconName
          });
        }
      });

    // Node circles
    node.append('circle')
      .attr('r', d => {
        if (d.depth === 0) return 16;
        if (d.data.artists) return 12;
        if (d.data.description || d.data.faqItems) return 14;
        return 8; // Slightly larger for FAQ subnodes
      })
      .attr('fill', d => {
        if (d.depth === 0) return '#39FF14';
        if (d.data.artists) return '#fff';
        if (d.data.id === 'vision' || d.data.id === 'rules' || d.data.id === 'faq') return '#39FF14';
        if (d.data.id && (d.data.id.includes('tickets') || d.data.id.includes('dresscode') || 
            d.data.id.includes('pleasure') || d.data.id.includes('accessibility') ||
            d.data.id.includes('doors') || d.data.id.includes('photography') ||
            d.data.id.includes('universe') || d.data.id.includes('lost'))) {
          return '#39FF14';
        }
        return 'rgba(255,255,255,0.6)';
      })
      .attr('stroke', 'rgba(255,255,255,0.8)')
      .attr('stroke-width', 2);

    // BAD HABITS central logo
    node.filter(d => d.depth === 0)
      .append('image')
      .attr('xlink:href', '/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png')
      .attr('x', -12)
      .attr('y', -12)
      .attr('width', 24)
      .attr('height', 24);

    // Add VISION icon
    node.filter(d => d.data.id === 'vision')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></div>');

    // Add RULES icon
    node.filter(d => d.data.id === 'rules')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg></div>');

    // Add FAQ icon
    node.filter(d => d.data.id === 'faq')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>');

    // Add FAQ sub-section icons
    node.filter(d => d.data.iconName === 'ticket')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket"><path d="M20 6.5V22H4V2h16v2.5"/><circle cx="16" cy="3" r="1"/><path d="M10 16h.01"/><path d="M2 16h8"/><path d="M14 16h8"/><path d="M2 12h8"/><path d="M14 12h8"/><path d="M2 8h8"/><path d="M14 8h8"/></svg></div>');

    node.filter(d => d.data.iconName === 'shirt')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg></div>');

    node.filter(d => d.data.iconName === 'heart')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>');

    node.filter(d => d.data.iconName === 'accessibility')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-accessibility"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5 2-2 4"/><path d="M4.649 19 7 9"/></svg></div>');

    node.filter(d => d.data.iconName === 'door-open')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-door-open"><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/></svg></div>');

    node.filter(d => d.data.iconName === 'camera')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg></div>');

    node.filter(d => d.data.iconName === 'globe')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>');

    node.filter(d => d.data.iconName === 'mail-search')
      .append('svg:foreignObject')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .html('<div style="color: white; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-search"><path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="m22 22-1.5-1.5"/></svg></div>');

    // Add artist images
    node.filter(d => d.data.artists)
      .append('image')
      .attr('xlink:href', d => d.data.artists[0].imageUrl)
      .attr('x', -10)
      .attr('y', -10)
      .attr('width', 20)
      .attr('height', 20)
      .attr('clip-path', 'circle(10px)');

    // Add node labels
    node.filter(d => !d.data.artists && d.depth !== 0 && !d.data.description && !d.data.faqItems)
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 8 : -8))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .text(d => d.data.name);

    // Add labels for info nodes
    node.filter(d => (d.data.description || d.data.faqItems) && d.data.id !== 'tickets' && d.data.id !== 'dresscode' && 
                   d.data.id !== 'pleasure-rooms' && d.data.id !== 'accessibility' && 
                   d.data.id !== 'doors-entry' && d.data.id !== 'photography-consent' && 
                   d.data.id !== 'bad-habits-universe' && d.data.id !== 'lost-found')
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 18 : -18))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.data.name);

    // Add labels for FAQ sub-nodes
    node.filter(d => (d.data.id === 'tickets' || d.data.id === 'dresscode' || 
                      d.data.id === 'pleasure-rooms' || d.data.id === 'accessibility' || 
                      d.data.id === 'doors-entry' || d.data.id === 'photography-consent' || 
                      d.data.id === 'bad-habits-universe' || d.data.id === 'lost-found'))
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 18 : -18))
      .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text(d => d.data.name);
  }, [dimensions]);

  const handleResetView = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  const badHabitsInfo = {
    id: "badhabits",
    name: "BAD HABITS",
    info: "BAD HABITS is an interdisciplinary club concept based on different art forms curated on the same dancefloor.",
    imageUrl: "/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png",
    instagramUrl: "https://www.instagram.com/badhabits.oslo/",
    category: "Club Concept",
    subCategory: "Interdisciplinary Arts"
  };

  // Function to get the appropriate icon component based on iconName
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return <HelpCircle size={64} />;
    
    switch(iconName) {
      case 'ticket':
        return <Ticket size={64} />;
      case 'shirt':
        return <Shirt size={64} />;
      case 'heart':
        return <Heart size={64} />;
      case 'accessibility':
        return <Accessibility size={64} />;
      case 'door-open':
        return <DoorOpen size={64} />;
      case 'camera':
        return <Camera size={64} />;
      case 'globe':
        return <Globe size={64} />;
      case 'mail-search':
        return <MailSearch size={64} />;
      default:
        return <HelpCircle size={64} />;
    }
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

        <div ref={containerRef} className="relative w-full h-[600px] rounded-lg glassmorphism overflow-hidden">
          <svg ref={svgRef} className="w-full h-full" />
          <div className="absolute top-8 right-8 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={handleResetView}
              className="bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-neon rounded-full"
              title="Center View"
            >
              <Compass className="h-5 w-5" />
            </Button>
          </div>
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
            name: showNodeInfo.name,
            info: showNodeInfo.info,
            imageUrl: "",
            instagramUrl: "",
            category: "BAD HABITS",
            subCategory: showNodeInfo.name,
            isInfoNode: true,
            faqItems: showNodeInfo.faqItems,
            iconName: showNodeInfo.iconName
          }}
          onClose={() => setShowNodeInfo(null)}
        />
      )}
    </section>
  );
};

export default Universe;
