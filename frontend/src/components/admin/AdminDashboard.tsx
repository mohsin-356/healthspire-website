import React, { useMemo, useState } from 'react';
import { useAuth } from '../../auth/auth-context';
import { useContentStore, IconName, getIcon } from '../../store/content-store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, LayoutGrid, Settings, Hospital, ListChecks, Info, Heart, Users, MessageSquareQuote, PanelLeftClose, PanelLeftOpen, GripVertical, Building2, FileText, Image as ImageIcon, UserCircle, LogOut, Upload } from 'lucide-react';

const ICON_OPTIONS: IconName[] = [
  'Hospital','Pill','FlaskConical','Shield','BarChart3','UserCheck',
  'Stethoscope','MessageCircle','FileText','TrendingUp','Clock','Smartphone','Database',
  'Users','Globe','Award','Target','TrendingUpIcon','Heart'
];

type TabKey = 'dashboard' | 'solutions' | 'features' | 'about' | 'values' | 'team' | 'clients' | 'blogs' | 'testimonials' | 'profile' | 'settings';

export function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(true);
  const { role } = useAuth();
  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Floating opener shown only when sidebar is hidden */}
      {!open && (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Show sidebar"
          onClick={()=>setOpen(true)}
          className="fixed left-3 top-20 md:top-20 z-50 rounded-full border border-border bg-card hover:bg-accent"
        >
          <PanelLeftOpen className="w-5 h-5"/>
        </Button>
      )}

      {open && (
        <aside className={`relative bg-card border-r border-border p-4 transition-all duration-300 md:sticky md:top-0 md:h-screen overflow-hidden ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between mb-4">
          {!collapsed && <div className="font-bold text-xl">Healthspire Admin</div>}
          <Button size="icon" variant="ghost" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={()=>setCollapsed(v=>!v)}>
            {collapsed ? <PanelLeftOpen className="w-5 h-5"/> : <PanelLeftClose className="w-5 h-5"/>}
          </Button>
        </div>
        <nav className="space-y-2">
          <SidebarItem collapsed={collapsed} active={tab==='dashboard'} onClick={()=>setTab('dashboard')} label="Dashboard" icon={<LayoutGrid className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='solutions'} onClick={()=>setTab('solutions')} label="Healthcare Solutions" icon={<Hospital className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='features'} onClick={()=>setTab('features')} label="Advanced Features" icon={<ListChecks className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='about'} onClick={()=>setTab('about')} label="Powered by MINDSPIRE" icon={<Info className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='values'} onClick={()=>setTab('values')} label="Our Core Values" icon={<Heart className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='team'} onClick={()=>setTab('team')} label="Our Team" icon={<Users className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='clients'} onClick={()=>setTab('clients')} label="Our Clients" icon={<Building2 className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='blogs'} onClick={()=>setTab('blogs')} label="Blog" icon={<FileText className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='testimonials'} onClick={()=>setTab('testimonials')} label="Testimonials" icon={<MessageSquareQuote className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='profile'} onClick={()=>setTab('profile')} label="Profile" icon={<UserCircle className="w-4 h-4"/>} />
          <SidebarItem collapsed={collapsed} active={tab==='settings'} onClick={()=>setTab('settings')} label="Settings" icon={<Settings className="w-4 h-4"/>} />
          {/* Toggle item after Settings */}
          <SidebarItem collapsed={collapsed} active={false} onClick={()=>setOpen(false)} label="Hide Sidebar" icon={<PanelLeftClose className="w-4 h-4"/>} />
        </nav>
        </aside>
      )}

      <main className="flex-1 p-6">
        {role==='demo' && (
          <div className="mb-4 p-3 rounded-lg border border-primary/30 bg-primary/5 text-primary text-sm">
            You are viewing the Admin Dashboard in <span className="font-medium">Live Demo</span> mode. Editing and CRUD actions are disabled.
          </div>
        )}
        {tab==='dashboard' && <DashboardOverview/>}
        {tab==='solutions' && <SolutionsManager/>}
        {tab==='features' && <FeaturesManager/>}
        {tab==='about' && <AboutManager/>}
        {tab==='values' && <ValuesManager/>}
        {tab==='team' && <TeamManager/>}
        {tab==='clients' && <ClientsManager/>}
        {tab==='blogs' && <BlogManager/>}
        {tab==='testimonials' && <TestimonialsManager/>}
        {tab==='profile' && <ProfilePanel/>}
        {tab==='settings' && <SettingsPanel/>}
      </main>
    </div>
  );
}

function ClientsManager(){
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const { data, addClient, updateClient, deleteClient, uploadImage } = useContentStore();
  const [draft, setDraft] = useState({ name:'', img:'' });

  return (
    <div>
      <SectionHeader title="Our Clients" subtitle="Manage client logos shown on the home page"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.clients.map(c => (
          <div key={c.id} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-full h-24 sm:w-28 sm:h-16 md:w-36 md:h-20 rounded-xl overflow-hidden border border-border bg-white p-2 flex items-center justify-center">
                <img src={c.img} alt={c.name} className="max-w-full max-h-full object-contain"/>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-medium">{c.name}</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full">
                <InlineClientEditor c={c} onSave={(patch)=>updateClient(c.id, patch)} disabled={!isAdmin}/>
              </div>
              <div className="mt-2 flex justify-end">
                <Button size="icon" variant="destructive" disabled={!isAdmin} className="bg-destructive text-destructive-foreground" onClick={()=>deleteClient(c.id)}><Trash2 className="w-4 h-4"/></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add Client</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Client Name"/>
          <Input value={draft.img} onChange={(e)=>setDraft({...draft, img:e.target.value})} placeholder="Logo URL"/>
          <Input type="file" accept="image/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(f){ try{ const url=await uploadImage(f); setDraft(d=>({...d, img:url})); }catch(err){ console.error(err);} e.currentTarget.value=''; } }} />
          <Button onClick={()=>{ if(!isAdmin) return; if(!draft.name || !draft.img) return; addClient({ name: draft.name, img: draft.img }); setDraft({ name:'', img:'' }); }}><Plus className="w-4 h-4 mr-2"/>Add</Button>
        </div>
      </div>
    </div>
  );
}

function InlineClientEditor({c, onSave, disabled}:{c:{name:string; img:string}; onSave:(p:Partial<typeof c>)=>void; disabled?:boolean}){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({...c});
  const { uploadImage } = useContentStore();
  if(!open) return <Button size="icon" variant="outline" disabled={disabled} onClick={()=>{ setOpen(true); setDraft({...c}); }}><Edit3 className="w-4 h-4"/></Button>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-2">
        <Input className="w-full" value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Client Name"/>
        <Input className="w-full" value={draft.img} onChange={(e)=>setDraft({...draft, img:e.target.value})} placeholder="Logo URL"/>
        <Input type="file" accept="image/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(f){ try{ const url=await uploadImage(f); setDraft(d=>({...d, img:url})); }catch(err){ console.error(err);} e.currentTarget.value=''; } }} />
        <div className="flex flex-col gap-2 mt-1">
          <Button disabled={disabled} onClick={()=>{ onSave(draft); setOpen(false); }} className="bg-primary text-primary-foreground w-full"><Save className="w-4 h-4 mr-2"/>Save</Button>
          <Button variant="outline" onClick={()=>setOpen(false)} className="w-full"><X className="w-4 h-4 mr-2"/>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function BlogManager(){
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const { data, addBlog, updateBlog, deleteBlog, uploadImage } = useContentStore();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({
    title: '', slug: '', author: '',
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }),
    excerpt: '', tags: '' as any, coverImg: '', contentHtml: '<p>Start writing...</p>',
    seoTitle: '', seoDescription: '', seoKeywords: ''
  });
  const [editingId, setEditingId] = useState<string|null>(null);
  const [editDraft, setEditDraft] = useState<any>(null);

  const toSlug = (s:string)=> s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
  async function handleFileToUpload(file: File, cb: (url:string)=>void){ try{ const url = await uploadImage(file); cb(url); }catch(e){ console.error(e); } }

  return (
    <div>
      <SectionHeader title="Blog" subtitle="Create, edit and manage blog posts with SEO"/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {(data.blogs||[]).map(post => {
          const isEditing = editingId===post.id;
          return (
            <div key={post.id} className="p-4 rounded-xl border border-border bg-card">
              {!isEditing ? (
                <div className="flex gap-3">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                    {post.coverImg ? <img src={post.coverImg} alt={post.title} className="w-full h-full object-cover"/> : <ImageIcon className="w-6 h-6 text-muted-foreground"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">{post.date} · {post.author}</div>
                    <div className="font-medium truncate">{post.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</div>
                    <div className="mt-2 flex flex-wrap gap-1">{post.tags.map((t,i)=>(<span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>))}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="outline" onClick={()=>{ setEditingId(post.id); setEditDraft({ ...post, tags: post.tags.join(', ') }); }}><Edit3 className="w-4 h-4"/></Button>
                    <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground" disabled={!isAdmin} onClick={()=>deleteBlog(post.id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input value={editDraft.title} onChange={(e)=>{ const v=e.target.value; setEditDraft((d:any)=>({...d, title:v, slug: d.slug || toSlug(v)})); }} placeholder="Title"/>
                    <Input value={editDraft.slug} onChange={(e)=>setEditDraft((d:any)=>({...d, slug: toSlug(e.target.value)}))} placeholder="Slug"/>
                    <Input value={editDraft.author} onChange={(e)=>setEditDraft((d:any)=>({...d, author:e.target.value}))} placeholder="Author"/>
                    <Input value={editDraft.date} onChange={(e)=>setEditDraft((d:any)=>({...d, date:e.target.value}))} placeholder="Date e.g. Oct 12, 2025"/>
                    <div className="md:col-span-2"><Textarea value={editDraft.excerpt} onChange={(e)=>setEditDraft((d:any)=>({...d, excerpt:e.target.value}))} placeholder="Excerpt"/></div>
                    <Input className="md:col-span-2" value={editDraft.tags} onChange={(e)=>setEditDraft((d:any)=>({...d, tags:e.target.value}))} placeholder="Tags (comma-separated)"/>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-28 h-20 rounded-md overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                      {editDraft.coverImg ? <img src={editDraft.coverImg} alt="cover" className="w-full h-full object-cover"/> : <ImageIcon className="w-5 h-5 text-muted-foreground"/>}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) handleFileToUpload(f, (url)=> setEditDraft((d:any)=>({...d, coverImg:url})) ); if(e.currentTarget) e.currentTarget.value=''; }} />
                      <Button variant="outline" onClick={()=>setEditDraft((d:any)=>({...d, coverImg:''}))}>Remove Image</Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Content</div>
                    <RichTextEditor value={editDraft.contentHtml} onChange={(html)=>setEditDraft((d:any)=>({...d, contentHtml: html}))} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input value={editDraft.seoTitle||''} onChange={(e)=>setEditDraft((d:any)=>({...d, seoTitle:e.target.value}))} placeholder="SEO Title"/>
                    <Input value={editDraft.seoKeywords||''} onChange={(e)=>setEditDraft((d:any)=>({...d, seoKeywords:e.target.value}))} placeholder="SEO Keywords (comma)"/>
                    <Input value={editDraft.seoDescription||''} onChange={(e)=>setEditDraft((d:any)=>({...d, seoDescription:e.target.value}))} placeholder="SEO Description"/>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-primary text-primary-foreground" disabled={!isAdmin} onClick={()=>{
                      const payload = { ...editDraft, tags: String(editDraft.tags||'').split(',').map((s:string)=>s.trim()).filter(Boolean) };
                      updateBlog(post.id, payload);
                      setEditingId(null); setEditDraft(null);
                    }}><Save className="w-4 h-4 mr-2"/>Save</Button>
                    <Button variant="outline" onClick={()=>{ setEditingId(null); setEditDraft(null); }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="font-medium">Add New Blog</div>
          <Button variant="outline" onClick={()=>setAdding(v=>!v)}>{adding ? 'Hide' : 'Show'} Form</Button>
        </div>
        {adding && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input value={draft.title} onChange={(e)=>{ const v=e.target.value; setDraft(d=>({ ...d, title:v, slug: d.slug || toSlug(v) })); }} placeholder="Title"/>
              <Input value={draft.slug} onChange={(e)=>setDraft(d=>({ ...d, slug: toSlug(e.target.value) }))} placeholder="Slug"/>
              <Input value={draft.author} onChange={(e)=>setDraft(d=>({ ...d, author:e.target.value }))} placeholder="Author"/>
              <Input value={draft.date} onChange={(e)=>setDraft(d=>({ ...d, date:e.target.value }))} placeholder="Date e.g. Oct 12, 2025"/>
              <div className="md:col-span-2"><Textarea value={draft.excerpt} onChange={(e)=>setDraft(d=>({ ...d, excerpt:e.target.value }))} placeholder="Excerpt"/></div>
              <Input className="md:col-span-2" value={draft.tags as any as string} onChange={(e)=>setDraft(d=>({ ...d, tags:e.target.value as any }))} placeholder="Tags (comma-separated)"/>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 h-20 rounded-md overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                {draft.coverImg ? <img src={draft.coverImg} alt="cover" className="w-full h-full object-cover"/> : <ImageIcon className="w-5 h-5 text-muted-foreground"/>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) handleFileToUpload(f, (url)=> setDraft(d=>({...d, coverImg:url})) ); if(e.currentTarget) e.currentTarget.value=''; }} />
                <Button variant="outline" onClick={()=>setDraft(d=>({...d, coverImg:''}))}>Remove Image</Button>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Content</div>
              <RichTextEditor value={draft.contentHtml} onChange={(html)=>setDraft(d=>({ ...d, contentHtml: html }))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input value={draft.seoTitle} onChange={(e)=>setDraft(d=>({ ...d, seoTitle:e.target.value }))} placeholder="SEO Title"/>
              <Input value={draft.seoKeywords} onChange={(e)=>setDraft(d=>({ ...d, seoKeywords:e.target.value }))} placeholder="SEO Keywords (comma)"/>
              <Input value={draft.seoDescription} onChange={(e)=>setDraft(d=>({ ...d, seoDescription:e.target.value }))} placeholder="SEO Description"/>
            </div>
            <div>
              <Button onClick={()=>{ if(!isAdmin) return; const tags=String(draft.tags||'').split(',').map(s=>s.trim()).filter(Boolean); if(!draft.title||!draft.slug) return; addBlog({ ...draft, tags }); setDraft({ title:'', slug:'', author:'', date: new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }), excerpt:'', tags:'' as any, coverImg:'', contentHtml:'<p>Start writing...</p>', seoTitle:'', seoDescription:'', seoKeywords:'' }); }}><Plus className="w-4 h-4 mr-2"/>Add Blog</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RichTextEditor({ value, onChange }:{ value:string; onChange:(html:string)=>void }){
  const ref = React.useRef<HTMLDivElement>(null);
  function cmd(command: string, arg?: string){ document.execCommand(command, false, arg); if(ref.current) onChange(ref.current.innerHTML); }
  React.useEffect(()=>{ if(ref.current && ref.current.innerHTML!==value) ref.current.innerHTML = value; }, [value]);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/40">
        <Button size="sm" variant="outline" onClick={()=>cmd('bold')}>B</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('italic')}>I</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('insertUnorderedList')}>• List</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('insertOrderedList')}>1. List</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('formatBlock','H2')}>H2</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('formatBlock','H3')}>H3</Button>
        <Button size="sm" variant="outline" onClick={()=>{ const url=prompt('Link URL'); if(url) cmd('createLink', url); }}>Link</Button>
        <Button size="sm" variant="outline" onClick={()=>cmd('removeFormat')}>Clear</Button>
      </div>
      <div ref={ref} className="min-h-[160px] p-3 prose prose-sm max-w-none focus:outline-none" contentEditable onInput={(e)=> onChange((e.target as HTMLDivElement).innerHTML)} suppressContentEditableWarning />
    </div>
  );
}

function ChartCard({ title, type, colorClass = 'text-primary' }:{ title:string; type:'line'|'bar'; colorClass?:string }){
  const [range, setRange] = useState<7|30>(7);
  const [hover, setHover] = useState<{ i:number; px:number; py:number } | null>(null);

  function seededSeries(n:number){
    let seed = title.split('').reduce((a,c)=>a + c.charCodeAt(0), 0) + n*97;
    const rand = (i:number)=>{
      const x = Math.sin(seed + i*12.345) * 10000;
      return x - Math.floor(x);
    };
    const base = Array.from({length:n}, (_,i)=> 40 + 30*Math.sin(i/3) + 20*rand(i));
    return base.map(v=> Math.max(1, Math.round(v)));
  }

  const data = useMemo(()=> seededSeries(range), [range]);
  const labels = useMemo(()=>{
    const today = new Date();
    return Array.from({length: range}, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (range - 1 - i));
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });
  }, [range]);
  const max = Math.max(...data, 1);

  const w = 120; // allow room for y labels
  const h = 56;  // allow room for x labels
  const padL = 16, padR = 4, padT = 6, padB = 12;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const points = data.map((v,i)=>{
    const x = padL + (innerW) * (data.length===1 ? 0.5 : i/(data.length-1));
    const y = padT + innerH - (v/max)*innerH;
    return [x,y] as const;
  });

  const linePath = 'M ' + points.map(p=>`${p[0]} ${p[1]}`).join(' L ');
  const areaPath = linePath + ` L ${points[points.length-1][0]} ${padT+innerH} L ${points[0][0]} ${padT+innerH} Z`;

  const barW = innerW / data.length;

  return (
    <div className="group p-4 rounded-xl border border-border bg-card relative shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <div className="font-medium">{title}</div>
        <div className="flex gap-1">
          <Button size="sm" variant={range===7 ? 'default' : 'outline'} onClick={()=>setRange(7)}>7D</Button>
          <Button size="sm" variant={range===30 ? 'default' : 'outline'} onClick={()=>setRange(30)}>30D</Button>
        </div>
      </div>

      <div className="w-full h-56 relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseMove={(e)=>{
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            // map to viewBox coords
            const xSvg = padL + (relX/rect.width) * innerW;
            // nearest point index by x
            let ni = 0, nd = Number.POSITIVE_INFINITY;
            for(let i=0;i<points.length;i++){
              const d = Math.abs(points[i][0] - xSvg);
              if(d < nd){ nd = d; ni = i; }
            }
            setHover({ i: ni, px: relX, py: relY });
          }}
          onMouseLeave={()=> setHover(null)}
        >
          {/* grid + axes */}
          <g className="text-foreground/10" stroke="currentColor" strokeWidth="0.3">
            {[0,1,2,3,4].map(i=>{
              const y = padT + innerH * (i/4);
              return <line key={`h-${i}`} x1={padL} x2={padL+innerW} y1={y} y2={y} />
            })}
            {/* axes */}
            <line x1={padL} x2={padL} y1={padT} y2={padT+innerH} />
            <line x1={padL} x2={padL+innerW} y1={padT+innerH} y2={padT+innerH} />
          </g>
          {/* hover guide line */}
          {hover && (
            <g className="text-primary" stroke="currentColor">
              <line x1={points[hover.i][0]} x2={points[hover.i][0]} y1={padT} y2={padT+innerH} strokeWidth="0.6" opacity="0.3" />
            </g>
          )}
          {/* y-axis labels */}
          <g className="text-foreground/60" fill="currentColor">
            {[0,0.25,0.5,0.75,1].map((t,i)=>{
              const y = padT + innerH - t*innerH;
              const v = Math.round(max * t);
              return <text key={`yl-${i}`} x={padL-2} y={y} fontSize="3" textAnchor="end" dominantBaseline="middle">{v}</text>
            })}
          </g>
          {/* x-axis labels */}
          <g className="text-foreground/60" fill="currentColor">
            {labels.map((lbl, i)=>{
              const step = range===7 ? 1 : Math.ceil(range/6);
              if(i % step !== 0 && i !== labels.length-1) return null;
              const x = padL + (innerW) * (data.length===1 ? 0.5 : i/(data.length-1));
              return <text key={`xl-${i}`} x={x} y={padT+innerH+6} fontSize="3" textAnchor="middle">{lbl}</text>
            })}
          </g>

          {type==='line' ? (
            <g className={colorClass}>
              <path d={areaPath} fill="currentColor" opacity="0.12" />
              <path d={linePath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
              {points.map((p,i)=> (
                <g key={i}>
                  <circle cx={p[0]} cy={p[1]} r={hover?.i===i ? 1.6 : 0.9} fill="currentColor" />
                </g>
              ))}
            </g>
          ) : (
            <g className={colorClass}>
              {data.map((v,i)=>{
                const x = padL + i*barW + barW*0.1;
                const y = padT + innerH - (v/max)*innerH;
                const height = padT + innerH - y;
                const isH = hover?.i === i;
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={barW*0.8} height={height} rx="0.8" fill="currentColor" opacity={isH ? 1 : 0.85} stroke={isH ? 'currentColor' : 'none'} strokeWidth={isH ? 0.6 : 0} />
                  </g>
                );
              })}
            </g>
          )}
        </svg>
        {/* tooltip */}
        {hover && (
          <div className="pointer-events-none absolute z-10" style={{ left: Math.min(hover.px + 12, 280), top: Math.max(hover.py + 12, 8) }}>
            <div className="rounded-md bg-popover text-popover-foreground text-xs px-2 py-1 border border-border shadow-sm whitespace-nowrap">
              <span className="font-medium">{labels[hover.i]}</span>
              <span className="mx-2">•</span>
              <span className="text-primary">{data[hover.i]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({active, onClick, label, icon, collapsed}:{active:boolean; onClick:()=>void; label:string; icon?:React.ReactNode; collapsed:boolean}){
  return (
    <button
      title={label}
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md border transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
      ${active ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/60 hover:border-primary bg-card text-foreground'}`}
    >
      <span className="inline-flex items-center justify-center w-5">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

function SectionHeader({title, subtitle}:{title:string; subtitle?:string}){
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function DashboardOverview(){
  const { data } = useContentStore();

  type StatCfg = { id: string; visible: boolean };
  type ChartCfg = { id: string; title: string; type: 'line'|'bar'; visible: boolean };

  const statDefs = useMemo(() => ([
    { id:'solutions', label:'Solutions', get:()=>data.specifications.length },
    { id:'features', label:'Features', get:()=>data.features.length },
    { id:'achievements', label:'Achievements', get:()=>data.about.achievements.length },
    { id:'values', label:'Values', get:()=>data.about.values.length },
    { id:'team', label:'Team Members', get:()=>data.team.length },
    { id:'testimonials', label:'Testimonials', get:()=>data.testimonials.length },
  ]), [data]);

  const defaultStats: StatCfg[] = statDefs.map(s=>({ id:s.id, visible:true }));
  const defaultCharts: ChartCfg[] = [
    { id:'active', title:'Active Users', type:'line' as const, visible:true },
    { id:'views', title:'Page Views', type:'bar' as const, visible:true },
    { id:'session', title:'Avg. Session (min)', type:'line' as const, visible:true },
    { id:'bounce', title:'Bounce Rate (%)', type:'bar' as const, visible:true },
  ];

  const [statsCfg, setStatsCfg] = useState<StatCfg[]>(() => {
    try {
      const raw = localStorage.getItem('admin_stats_layout_v1');
      return raw ? (JSON.parse(raw) as StatCfg[]) : defaultStats;
    } catch {
      return defaultStats;
    }
  });
  const [chartsCfg, setChartsCfg] = useState<ChartCfg[]>(() => {
    try {
      const raw = localStorage.getItem('admin_charts_layout_v1');
      return raw ? (JSON.parse(raw) as ChartCfg[]) : defaultCharts;
    } catch {
      return defaultCharts;
    }
  });
  // selection toolbar only (no popover)

  React.useEffect(()=>{ try{ localStorage.setItem('admin_stats_layout_v1', JSON.stringify(statsCfg)); }catch{} }, [statsCfg]);
  React.useEffect(()=>{ try{ localStorage.setItem('admin_charts_layout_v1', JSON.stringify(chartsCfg)); }catch{} }, [chartsCfg]);

  const dragRef = React.useRef<{ kind:'stat'|'chart'; index:number }|null>(null);

  const reorder = <T,>(arr:T[], from:number, to:number)=>{
    const copy = arr.slice();
    const [m] = copy.splice(from,1);
    copy.splice(to,0,m);
    return copy;
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <SectionHeader title="Dashboard" subtitle="Overview of your home page content"/>
        <div className="text-xs text-muted-foreground mt-2">Drag items to reorder</div>
      </div>

      <div className="mb-8 md:mb-10 p-3 rounded-xl border border-border bg-card/60 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">Stats:</span>
          {statsCfg.map((s: StatCfg, i: number)=>{
            const def = statDefs.find(d=>d.id===s.id)!;
            return (
              <Button key={s.id} size="sm" variant={s.visible ? 'default' : 'outline'} onClick={()=>{
                const next = statsCfg.slice(); next[i] = { ...s, visible: !s.visible }; setStatsCfg(next);
              }}>{def.label}</Button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Charts:</span>
          {chartsCfg.map((c: ChartCfg, i: number)=> (
            <Button key={c.id} size="sm" variant={c.visible ? 'default' : 'outline'} onClick={()=>{
              const next = chartsCfg.slice(); next[i] = { ...c, visible: !c.visible }; setChartsCfg(next);
            }}>{c.title}</Button>
          ))}
          <div className="ml-auto">
            <Button size="sm" variant="outline" onClick={()=>{ setStatsCfg(defaultStats); setChartsCfg(defaultCharts); }}>Reset</Button>
          </div>
        </div>
      </div>

      {statsCfg.some(s=>s.visible) ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCfg.filter((s: StatCfg)=>s.visible).map((s: StatCfg, i: number)=>{
          const def = statDefs.find(d=>d.id===s.id)!;
          const count = def.get();
          return (
            <div
              key={s.id}
              draggable
              onDragStart={()=>{ dragRef.current = { kind:'stat', index:i }; }}
              onDragOver={(e)=>{ e.preventDefault(); }}
              onDrop={()=>{
                if(dragRef.current?.kind==='stat'){
                  setStatsCfg((cfg: StatCfg[])=> reorder(cfg, dragRef.current!.index, i));
                }
                dragRef.current=null;
              }}
              className="group relative p-4 pl-8 pt-7 rounded-xl border bg-card shadow-sm hover:shadow-md transition border-border/70 hover:border-primary/30"
            >
              <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-70 transition pointer-events-none"><GripVertical className="w-4 h-4"/></div>
              <div className="text-sm text-muted-foreground">{def.label}</div>
              <div className="text-3xl font-bold">{count}</div>
            </div>
          );
        })}
      </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">No stats selected. Use the selection above to show items.</div>
      )}

      {chartsCfg.some(c=>c.visible) ? (
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {chartsCfg.filter((c: ChartCfg)=>c.visible).map((c: ChartCfg, i: number)=> (
          <div
            key={c.id}
            draggable
            onDragStart={()=>{ dragRef.current = { kind:'chart', index:i }; }}
            onDragOver={(e)=>{ e.preventDefault(); }}
            onDrop={()=>{
              if(dragRef.current?.kind==='chart'){
                setChartsCfg((cfg: ChartCfg[])=> reorder(cfg, dragRef.current!.index, i));
              }
              dragRef.current=null;
            }}
            className="relative"
          >
            <ChartCard title={c.title} type={c.type} colorClass="text-primary"/>
            <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-70 transition pointer-events-none"><GripVertical className="w-4 h-4"/></div>
          </div>
        ))}
      </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground mt-8">No charts selected. Use the selection above to show items.</div>
      )}
    </div>
  );
}

function IconSelect({value, onChange}:{value:IconName; onChange:(v:IconName)=>void}){
  return (
    <select className="w-full border border-border rounded-md p-2 bg-background" value={value} onChange={(e)=>onChange(e.target.value as IconName)}>
      {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}

function SolutionsManager(){
  const { data, addSpecification, updateSpecification, deleteSpecification } = useContentStore();
  const [draft, setDraft] = useState({ icon: 'Hospital' as IconName, title: '', description: '', stats: '' });
  const [editingId, setEditingId] = useState<string|null>(null);
  const [editDraft, setEditDraft] = useState<{icon:IconName; title:string; description:string; stats:string} | null>(null);

  return (
    <div>
      <SectionHeader title="Healthcare Solutions" subtitle="Manage solution cards shown on the home page"/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {data.specifications.map(item => {
          const Icon = getIcon(item.icon);
          const isEditing = editingId===item.id;
          return (
            <div key={item.id} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary"/>
                </div>
                <div className="flex-1">
                  {isEditing && editDraft ? (
                    <div className="space-y-2">
                      <IconSelect value={editDraft.icon} onChange={(v)=>setEditDraft({...editDraft, icon:v})}/>
                      <Input value={editDraft.title} onChange={(e)=>setEditDraft({...editDraft, title:e.target.value})} placeholder="Title"/>
                      <Textarea value={editDraft.description} onChange={(e)=>setEditDraft({...editDraft, description:e.target.value})} placeholder="Description"/>
                      <Input value={editDraft.stats} onChange={(e)=>setEditDraft({...editDraft, stats:e.target.value})} placeholder="Stats"/>
                      <div className="flex gap-2">
                        <Button onClick={()=>{ updateSpecification(item.id, editDraft); setEditingId(null); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button>
                        <Button variant="outline" onClick={()=>{ setEditingId(null); setEditDraft(null); }}><X className="w-4 h-4 mr-2"/>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="text-xs mt-2">{item.stats}</div>
                    </>
                  )}
                </div>
                {!isEditing ? (
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={()=>{ setEditingId(item.id); setEditDraft({icon:item.icon, title:item.title, description:item.description, stats:item.stats}); }}><Edit3 className="w-4 h-4"/></Button>
                    <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground" onClick={()=>deleteSpecification(item.id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add New Solution</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-1"><IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/></div>
          <Input value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
          <Input value={draft.stats} onChange={(e)=>setDraft({...draft, stats:e.target.value})} placeholder="Stats e.g. 99.9% Uptime"/>
          <div className="md:col-span-4"><Textarea value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/></div>
        </div>
        <div className="mt-3"><Button onClick={()=>{ if(!draft.title) return; addSpecification(draft); setDraft({ icon: 'Hospital', title:'', description:'', stats:''}); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      </div>
    </div>
  );
}

function FeaturesManager(){
  const { data, addFeature, updateFeature, deleteFeature } = useContentStore();
  const [draft, setDraft] = useState({ icon: 'Stethoscope' as IconName, title: '', description: '', benefits: '' });
  const [editingId, setEditingId] = useState<string|null>(null);
  const [editDraft, setEditDraft] = useState<{icon:IconName; title:string; description:string; benefits:string} | null>(null);

  return (
    <div>
      <SectionHeader title="Advanced Healthcare Features" subtitle="Manage the features grid"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {data.features.map(item => {
          const Icon = getIcon(item.icon);
          const isEditing = editingId===item.id;
          return (
            <div key={item.id} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary"/></div>
                <div className="flex-1">
                  {isEditing && editDraft ? (
                    <div className="space-y-2">
                      <IconSelect value={editDraft.icon} onChange={(v)=>setEditDraft({...editDraft, icon:v})}/>
                      <Input value={editDraft.title} onChange={(e)=>setEditDraft({...editDraft, title:e.target.value})} placeholder="Title"/>
                      <Textarea value={editDraft.description} onChange={(e)=>setEditDraft({...editDraft, description:e.target.value})} placeholder="Description"/>
                      <Input value={editDraft.benefits} onChange={(e)=>setEditDraft({...editDraft, benefits:e.target.value})} placeholder="Benefits (comma-separated)"/>
                      <div className="flex gap-2"><Button onClick={()=>{ updateFeature(item.id, { ...item, ...editDraft, benefits: editDraft.benefits.split(',').map(s=>s.trim()).filter(Boolean) }); setEditingId(null); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button><Button variant="outline" onClick={()=>{ setEditingId(null); setEditDraft(null); }}><X className="w-4 h-4 mr-2"/>Cancel</Button></div>
                    </div>
                  ) : (
                    <>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="text-xs mt-2 text-muted-foreground">{item.benefits.join(', ')}</div>
                    </>
                  )}
                </div>
                {!isEditing ? (
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={()=>{ setEditingId(item.id); setEditDraft({icon:item.icon, title:item.title, description:item.description, benefits:item.benefits.join(', ')}); }}><Edit3 className="w-4 h-4"/></Button>
                    <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground" onClick={()=>deleteFeature(item.id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add New Feature</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-1"><IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/></div>
          <Input value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
          <div className="md:col-span-2"><Input value={draft.benefits} onChange={(e)=>setDraft({...draft, benefits:e.target.value})} placeholder="Benefits (comma-separated)"/></div>
          <div className="md:col-span-4"><Textarea value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/></div>
        </div>
        <div className="mt-3"><Button onClick={()=>{ if(!draft.title) return; addFeature({ icon: draft.icon, title: draft.title, description: draft.description, benefits: draft.benefits.split(',').map(s=>s.trim()).filter(Boolean) }); setDraft({ icon: 'Stethoscope', title:'', description:'', benefits:''}); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      </div>
    </div>
  );
}

function AboutManager(){
  const { data, updateAbout, addAchievement, updateAchievement, deleteAchievement } = useContentStore();
  const [form, setForm] = useState({ heading: data.about.heading, subheading: data.about.subheading, ctaText: data.about.ctaText, ctaUrl: data.about.ctaUrl });

  return (
    <div>
      <SectionHeader title="Powered by MINDSPIRE" subtitle="Edit heading, subheading and achievements"/>
      <div className="p-4 rounded-xl border border-border bg-card mb-6 space-y-3">
        <Input value={form.heading} onChange={(e)=>setForm({...form, heading:e.target.value})} placeholder="Heading"/>
        <Textarea value={form.subheading} onChange={(e)=>setForm({...form, subheading:e.target.value})} placeholder="Subheading"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input value={form.ctaText} onChange={(e)=>setForm({...form, ctaText:e.target.value})} placeholder="CTA Text"/>
          <Input value={form.ctaUrl} onChange={(e)=>setForm({...form, ctaUrl:e.target.value})} placeholder="CTA URL"/>
        </div>
        <div><Button onClick={()=>updateAbout(form)} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save About</Button></div>
      </div>

      <div className="mb-6">
        <div className="font-medium mb-3">Achievements</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {data.about.achievements.map(a=>{
            const Icon = getIcon(a.icon);
            return (
              <div key={a.id} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary"/></div>
                  <div className="flex-1">
                    <div className="font-medium">{a.label} – <span className="text-primary">{a.number}</span></div>
                    <div className="text-sm text-muted-foreground">{a.description}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-start gap-2 mt-3">
                  <InlineAchievementEditor a={a} onSave={(patch)=>updateAchievement(a.id, patch)} />
                  <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground self-start" onClick={()=>deleteAchievement(a.id)}><Trash2 className="w-4 h-4"/></Button>
                </div>
              </div>
            );
          })}
        </div>
        <AddAchievement onAdd={(item)=>addAchievement(item)}/>
      </div>
    </div>
  );
}

function InlineAchievementEditor({a, onSave}:{a:{icon:IconName; number:string; label:string; description:string}; onSave:(p:Partial<typeof a>)=>void}){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({...a});
  if(!open) return <Button size="icon" variant="outline" onClick={()=>{ setOpen(true); setDraft({...a}); }}><Edit3 className="w-4 h-4"/></Button>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <div className="md:col-span-2"><IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/></div>
        <Input className="md:col-span-1" value={draft.number} onChange={(e)=>setDraft({...draft, number:e.target.value})} placeholder="#"/>
        <Input className="md:col-span-1" value={draft.label} onChange={(e)=>setDraft({...draft, label:e.target.value})} placeholder="Label"/>
        <Input className="md:col-span-2" value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/>
        <div className="md:col-span-6 flex justify-end gap-2 mt-1">
          <Button onClick={()=>{ onSave(draft); setOpen(false); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button>
          <Button variant="outline" onClick={()=>setOpen(false)}><X className="w-4 h-4 mr-2"/>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function AddAchievement({onAdd}:{onAdd:(i:{icon:IconName; number:string; label:string; description:string})=>void}){
  const [draft, setDraft] = useState({ icon:'Users' as IconName, number:'', label:'', description:'' });
  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="font-medium mb-3">Add Achievement</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/>
        <Input value={draft.number} onChange={(e)=>setDraft({...draft, number:e.target.value})} placeholder="Number e.g. 10M+"/>
        <Input value={draft.label} onChange={(e)=>setDraft({...draft, label:e.target.value})} placeholder="Label"/>
        <Input value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/>
      </div>
      <div className="mt-3"><Button onClick={()=>{ if(!draft.label) return; onAdd(draft); setDraft({ icon:'Users', number:'', label:'', description:'' }); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
    </div>
  );
}

function ValuesManager(){
  const { data, addValue, updateValue, deleteValue } = useContentStore();
  const [draft, setDraft] = useState({ icon:'Heart' as IconName, title:'', description:'' });

  return (
    <div>
      <SectionHeader title="Our Core Values" subtitle="Manage value cards"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {data.about.values.map(v=>{
          const Icon = getIcon(v.icon);
          return (
            <div key={v.id} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary"/></div>
                <div className="flex-1">
                  <div className="font-medium">{v.title}</div>
                  <div className="text-sm text-muted-foreground">{v.description}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2 mt-3">
                <InlineValueEditor v={v} onSave={(patch)=>updateValue(v.id, patch)}/>
                <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground self-start" onClick={()=>deleteValue(v.id)}><Trash2 className="w-4 h-4"/></Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add Value</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/>
          <Input value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
          <Input value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/>
        </div>
        <div className="mt-3"><Button onClick={()=>{ if(!draft.title) return; addValue(draft); setDraft({ icon:'Heart', title:'', description:''}); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      </div>
    </div>
  );
}

function InlineValueEditor({v, onSave}:{v:{icon:IconName; title:string; description:string}; onSave:(p:Partial<typeof v>)=>void}){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({...v});
  if(!open) return <Button size="icon" variant="outline" onClick={()=>{ setOpen(true); setDraft({...v}); }}><Edit3 className="w-4 h-4"/></Button>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="md:col-span-1"><IconSelect value={draft.icon} onChange={(v)=>setDraft({...draft, icon:v})}/></div>
        <Input className="md:col-span-2" value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
        <Input className="md:col-span-2" value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} placeholder="Description"/>
        <div className="md:col-span-5 flex justify-end gap-2 mt-1">
          <Button onClick={()=>{ onSave(draft); setOpen(false); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button>
          <Button variant="outline" onClick={()=>setOpen(false)}><X className="w-4 h-4 mr-2"/>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function TeamManager(){
  const { data, addTeamMember, updateTeamMember, deleteTeamMember, uploadImage } = useContentStore();
  const [draft, setDraft] = useState({ name:'', role:'', img:'' });

  return (
    <div>
      <SectionHeader title="Our Team" subtitle="Manage team members shown on the home page"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {data.team.map(m => (
          <div key={m.id} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <img src={m.img} alt={m.name} className="w-16 h-16 object-cover rounded-lg"/>
              <div className="flex-1">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-2 mt-3">
              <InlineTeamEditor m={m} onSave={(patch)=>updateTeamMember(m.id, patch)}/>
              <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground self-start" onClick={()=>deleteTeamMember(m.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add Team Member</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Full Name"/>
          <Input value={draft.role} onChange={(e)=>setDraft({...draft, role:e.target.value})} placeholder="Role"/>
          <Input value={draft.img} onChange={(e)=>setDraft({...draft, img:e.target.value})} placeholder="Image URL"/>
          <Input type="file" accept="image/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(f){ try{ const url=await uploadImage(f); setDraft(d=>({...d, img:url})); }catch(err){ console.error(err);} e.currentTarget.value=''; } }} />
        </div>
        <div className="mt-3"><Button onClick={()=>{ if(!draft.name) return; addTeamMember(draft); setDraft({ name:'', role:'', img:'' }); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      </div>
    </div>
  );
}

function InlineTeamEditor({m, onSave}:{m:{name:string; role:string; img:string}; onSave:(p:Partial<typeof m>)=>void}){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({...m});
  const { uploadImage } = useContentStore();
  if(!open) return <Button size="icon" variant="outline" onClick={()=>{ setOpen(true); setDraft({...m}); }}><Edit3 className="w-4 h-4"/></Button>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <Input className="md:col-span-2" value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Name"/>
        <Input className="md:col-span-2" value={draft.role} onChange={(e)=>setDraft({...draft, role:e.target.value})} placeholder="Role"/>
        <Input className="md:col-span-2" value={draft.img} onChange={(e)=>setDraft({...draft, img:e.target.value})} placeholder="Image URL"/>
        <Input className="md:col-span-2" type="file" accept="image/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(f){ try{ const url=await uploadImage(f); setDraft(d=>({...d, img:url})); }catch(err){ console.error(err);} (e.currentTarget as HTMLInputElement).value=''; } }} />
        <div className="md:col-span-6 flex justify-end gap-2 mt-1">
          <Button onClick={()=>{ onSave(draft); setOpen(false); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button>
          <Button variant="outline" onClick={()=>setOpen(false)}><X className="w-4 h-4 mr-2"/>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function TestimonialsManager(){
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useContentStore();
  const [draft, setDraft] = useState({ name:'', title:'', organization:'', content:'', rating:5, avatar:'' });

  return (
    <div>
      <SectionHeader title="Trusted by Healthcare Leaders" subtitle="Manage testimonials"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {data.testimonials.map(t => (
          <div key={t.id} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">{t.avatar}</div>
              <div className="flex-1">
                <div className="font-medium">{t.name} · <span className="text-muted-foreground text-sm">{t.title}</span></div>
                <div className="text-sm text-primary mb-1">{t.organization}</div>
                <div className="text-sm text-muted-foreground">“{t.content}”</div>
                <div className="text-xs mt-1">Rating: {t.rating}/5</div>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-2 mt-3">
              <InlineTestimonialEditor t={t} onSave={(patch)=>updateTestimonial(t.id, patch)}/>
              <Button size="icon" variant="destructive" className="bg-destructive text-destructive-foreground" onClick={()=>deleteTestimonial(t.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-3">Add Testimonial</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Name"/>
          <Input value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
          <Input value={draft.organization} onChange={(e)=>setDraft({...draft, organization:e.target.value})} placeholder="Organization"/>
          <div className="md:col-span-3"><Textarea value={draft.content} onChange={(e)=>setDraft({...draft, content:e.target.value})} placeholder="Content"/></div>
          <Input type="number" value={draft.rating} onChange={(e)=>setDraft({...draft, rating: Number(e.target.value)})} placeholder="Rating (1-5)"/>
          <Input value={draft.avatar} onChange={(e)=>setDraft({...draft, avatar:e.target.value})} placeholder="Avatar initial(s) e.g. SC"/>
        </div>
        <div className="mt-3"><Button onClick={()=>{ if(!draft.name) return; addTestimonial(draft); setDraft({ name:'', title:'', organization:'', content:'', rating:5, avatar:'' }); }}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      </div>
    </div>
  );
}

function InlineTestimonialEditor({t, onSave}:{t:{name:string; title:string; organization:string; content:string; rating:number; avatar:string}; onSave:(p:Partial<typeof t>)=>void}){
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({...t});
  if(!open) return <Button size="icon" variant="outline" onClick={()=>{ setOpen(true); setDraft({...t}); }}><Edit3 className="w-4 h-4"/></Button>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 w-full">
        <Input className="md:col-span-2" value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} placeholder="Name"/>
        <Input className="md:col-span-2" value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} placeholder="Title"/>
        <Input className="md:col-span-2" value={draft.organization} onChange={(e)=>setDraft({...draft, organization:e.target.value})} placeholder="Organization"/>
        <Input className="md:col-span-1" type="number" value={draft.rating} onChange={(e)=>setDraft({...draft, rating:Number(e.target.value)})} placeholder="1-5"/>
        <Input className="md:col-span-1" value={draft.avatar} onChange={(e)=>setDraft({...draft, avatar:e.target.value})} placeholder="Avatar"/>
        <div className="md:col-span-6 flex justify-end gap-2">
          <Button onClick={()=>{ onSave(draft); setOpen(false); }} className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2"/>Save</Button>
          <Button variant="outline" onClick={()=>setOpen(false)}><X className="w-4 h-4 mr-2"/>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel(){
  const { user, role, logout, updateProfile } = useAuth();
  const { uploadImage } = useContentStore();
  const [busy, setBusy] = useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0];
    if(!f) return;
    setBusy(true);
    try{
      const url = await uploadImage(f);
      await updateProfile({ avatar: url });
    }finally{
      setBusy(false);
      e.currentTarget.value='';
    }
  }

  const initials = (user?.email||'U').slice(0,2).toUpperCase();

  return (
    <div>
      <SectionHeader title="Profile" subtitle="Manage your admin profile"/>
      <div className="p-4 rounded-xl border border-border bg-card max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-border"/>
            ) : (
              <div className="w-16 h-16 rounded-full border border-border bg-primary/10 text-primary flex items-center justify-center font-semibold">{initials}</div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">{user?.email || '—'}</div>
            <div className="text-xs text-muted-foreground">Role: {role}</div>
          </div>
          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} disabled={busy} className="hidden"/>
            <Button type="button" variant="outline" onClick={()=>fileRef.current?.click()} disabled={busy}>
              <Upload className="w-4 h-4 mr-2"/>Upload
            </Button>
            <Button type="button" variant="destructive" className="bg-destructive text-destructive-foreground" onClick={logout}><LogOut className="w-4 h-4 mr-2"/>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel(){
  const { reset } = useContentStore();
  return (
    <div>
      <SectionHeader title="Settings" subtitle="Danger zone and utilities"/>
      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="font-medium mb-2">Reset Content</div>
        <p className="text-sm text-muted-foreground mb-3">Restore all home page content to defaults. This will remove your local changes stored in the browser.</p>
        <Button variant="destructive" className="bg-destructive text-destructive-foreground" onClick={reset}>Reset to Defaults</Button>
      </div>
    </div>
  );
}
