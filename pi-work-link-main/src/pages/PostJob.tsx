import { useState } from "react";
import { BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Upload,
  X,
  Plus,
  DollarSign,
  Star,
  FileText,
  Image as ImageIcon,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Video,
  Music,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    budgetType: "fixed",
    budgetAmount: [100],
    experienceLevel: "",
    projectDuration: "",
    skills: [] as string[],
    attachments: [] as File[],
    isUrgent: false,
    requiresNDA: false,
  });

  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();

  const categories = [
    { id: "development", name: "Development & IT", icon: Code, subcategories: ["Web Development","Mobile Development","Desktop Software","Database","DevOps","Cybersecurity"] },
    { id: "design", name: "Design & Creative", icon: Palette, subcategories: ["Web Design","Graphic Design","UI/UX Design","Logo Design","Brand Identity","Illustration"] },
    { id: "writing", name: "Writing & Translation", icon: PenTool, subcategories: ["Content Writing","Copywriting","Technical Writing","Translation","Proofreading","Creative Writing"] },
    { id: "marketing", name: "Sales & Marketing", icon: Megaphone, subcategories: ["Digital Marketing","Social Media","SEO","Email Marketing","Lead Generation","Market Research"] },
    { id: "video", name: "Video & Animation", icon: Video, subcategories: ["Video Editing","Motion Graphics","Animation","Whiteboard Animation","Video Production","3D Animation"] },
    { id: "music", name: "Music & Audio", icon: Music, subcategories: ["Voice Over","Music Production","Audio Editing","Sound Design","Podcast Production","Jingles"] },
  ];

  const selectedCategory = categories.find(cat => cat.id === jobData.category);

  const handleSkillAdd = () => {
    if (skillInput.trim() && !jobData.skills.includes(skillInput.trim())) {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill: string) => {
    setJobData({ ...jobData, skills: jobData.skills.filter(s => s !== skill) });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + jobData.attachments.length > 5) {
      toast({ title: "Too many files", description: "You can upload maximum 5 files", variant: "destructive" });
      return;
    }
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: `${file.name} is larger than 10MB`, variant: "destructive" });
        return false;
      }
      return true;
    });
    setJobData({ ...jobData, attachments: [...jobData.attachments, ...validFiles] });
  };

  const handleFileRemove = (index: number) => {
    setJobData({ ...jobData, attachments: jobData.attachments.filter((_, i) => i !== index) });
  };

  const handleSubmit = () => {
    if (!jobData.title.trim()) return toast({ title: "Missing title", description: "Please enter a job title", variant: "destructive" });
    if (!jobData.description.trim()) return toast({ title: "Missing description", description: "Please enter a job description", variant: "destructive" });
    if (!jobData.category) return toast({ title: "Missing category", description: "Please select a category", variant: "destructive" });

    const formData = new FormData();
    formData.append("title", jobData.title);
    formData.append("description", jobData.description);
    formData.append("category", jobData.category);
    formData.append("budget", jobData.budgetAmount[0].toString());
    formData.append("deadline", jobData.projectDuration || "");
    jobData.attachments.forEach(file => formData.append("attachments", file));

    fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("authToken")}`,
      },
      body: formData,
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: "Failed" }));
          return toast({ title: "Error", description: err.message || "Failed to post job", variant: "destructive" });
        }
        toast({ title: "Job Posted", description: "Your job has been posted." });
        window.location.href = "/dashboard";
      })
      .catch(() => toast({ title: "Error", description: "Network error", variant: "destructive" }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
          <p className="text-muted-foreground">Tell us what you need done and get free quotes from skilled freelancers</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Job Details</CardTitle>
                <CardDescription>Provide a clear title and detailed description of your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input id="title" placeholder="e.g., Build a responsive React website"
                    value={jobData.title} onChange={e=>setJobData({...jobData,title:e.target.value})}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea id="description" placeholder="Describe your project in detail..." className="min-h-32"
                    value={jobData.description} onChange={e=>setJobData({...jobData,description:e.target.value})}/>
                </div>
              </CardContent>
            </Card>

            {/* Category & Skills */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Category & Skills</CardTitle>
                <CardDescription>Help freelancers find your job by selecting the right category and skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={jobData.category} onValueChange={v=>setJobData({...jobData,category:v,subcategory:""})}>
                      <SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger>
                      <SelectContent>{categories.map(cat=>(
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2"><cat.icon className="h-4 w-4"/>{cat.name}</div>
                        </SelectItem>
                      ))}</SelectContent>
                    </Select>
                  </div>
                  {selectedCategory && (
                    <div className="space-y-2">
                      <Label>Subcategory</Label>
                      <Select value={jobData.subcategory} onValueChange={v=>setJobData({...jobData,subcategory:v})}>
                        <SelectTrigger><SelectValue placeholder="Select subcategory"/></SelectTrigger>
                        <SelectContent>{selectedCategory.subcategories.map(sub=><SelectItem key={sub} value={sub}>{sub}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Add a skill" value={skillInput} onChange={e=>setSkillInput(e.target.value)}
                      onKeyPress={e=>e.key==="Enter" && (e.preventDefault(),handleSkillAdd())}/>
                    <Button onClick={handleSkillAdd} variant="outline"><Plus className="h-4 w-4"/></Button>
                  </div>
                  {jobData.skills.length>0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {jobData.skills.map(skill=>(
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button onClick={()=>handleSkillRemove(skill)} className="text-muted-foreground hover:text-foreground"><X className="h-3 w-3"/></button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5"/> Budget & Timeline</CardTitle>
                <CardDescription>Set your budget and project timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label>Budget Type</Label>
                  <RadioGroup value={jobData.budgetType} onValueChange={v=>setJobData({...jobData,budgetType:v})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed"/><Label htmlFor="fixed">Fixed Price Project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly"/><Label htmlFor="hourly">Hourly Rate</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Budget Range - {jobData.budgetAmount[0]} {jobData.budgetType==="hourly" && "per hour"}</Label>
                  <div className="px-2">
                    <Slider value={jobData.budgetAmount} onValueChange={v=>setJobData({...jobData,budgetAmount:v})} min={10} max={5000} step={10}/>
                    <div className="flex justify-between text-sm text-muted-foreground"><span>10</span><span>5000</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5"/> Attachments</CardTitle>
                <CardDescription>Upload files to help explain your project (Max 5 files, 10MB each)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground"/>
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"/>
                  <Button variant="outline" onClick={()=>document.getElementById('file-upload')?.click()}>Choose Files</Button>
                </div>
                {jobData.attachments.length>0 && (
                  <div className="space-y-2">{jobData.attachments.map((file,index)=>(
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2"><FileText className="h-4 w-4"/><span className="text-sm">{file.name}</span><span className="text-xs text-muted-foreground">({(file.size/1024/1024).toFixed(1)} MB)</span></div>
                      <Button variant="ghost" size="icon" onClick={()=>handleFileRemove(index)}><X className="h-4 w-4"/></Button>
                    </div>
                  ))}</div>
                )}
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="card-glow">
              <CardHeader><CardTitle>Additional Options</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="urgent" checked={jobData.isUrgent} onCheckedChange={checked=>setJobData({...jobData,isUrgent:!!checked})}/>
                  <Label htmlFor="urgent" className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-warning"/>Mark as Urgent (+20% fee)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nda" checked={jobData.requiresNDA} onCheckedChange={checked=>setJobData({...jobData,requiresNDA:!!checked})}/>
                  <Label htmlFor="nda">Require NDA (Non-Disclosure Agreement)</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <Card className="card-glow">
              <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500"/>Tips for Success</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2"><p className="font-medium">📝 Write a clear title</p><p className="text-muted-foreground">Be specific about what you need</p></div>
                <div className="text-sm space-y-2"><p className="font-medium">📋 Detailed description</p><p className="text-muted-foreground">Include all requirements and expectations</p></div>
                <div className="text-sm space-y-2"><p className="font-medium">💰 Set fair budget</p><p className="text-muted-foreground">Research market rates for better results</p></div>
                <div className="text-sm space-y-2"><p className="font-medium">📎 Add examples</p><p className="text-muted-foreground">Visual references help freelancers understand</p></div>
              </CardContent>
            </Card>

            {/* Job Preview */}
            <Card className="card-glow">
              <CardHeader><CardTitle>Job Preview</CardTitle><CardDescription>How your job will appear to freelancers</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                <div><h3 className="font-semibold">{jobData.title || "Your Job Title"}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedCategory?.name}{jobData.subcategory && ` • ${jobData.subcategory}`}</p></div>
                <div className="text-sm"><span className="font-medium">Budget: </span><span className="text-accent">{jobData.budgetAmount[0]} {jobData.budgetType==="hourly" && "per hour"}</span></div>
                {jobData.skills.length>0 && <div className="flex flex-wrap gap-1">{jobData.skills.slice(0,3).map(skill=><Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>)}{jobData.skills.length>3 && <Badge variant="outline" className="text-xs">+{jobData.skills.length-3} more</Badge>}</div>}
                <p className="text-xs text-muted-foreground">{jobData.description.slice(0,100) || "Your job description will appear here..."}{jobData.description.length>100 && "..."}</p>
              </CardContent>
            </Card>

            {/* Post Button */}
            <Card className="card-glow">
              <CardContent className="pt-6">
                <Button onClick={handleSubmit} className="w-full btn-hero" size="lg">Post Job & Get Quotes</Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">Posting is free. You only pay when you hire someone.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
