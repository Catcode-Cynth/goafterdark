import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const categories = ["Music", "Tech", "Sports", "Art", "Food", "Business", "Comedy", "Other"];

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Music",
    date: "",
    time: "",
    location: "",
    price: "",
    total_tickets: "100",
    image_url: "",
    organizer_name: "",
    status: "published",
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    update("image_url", file_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Event.create({
      ...form,
      price: parseFloat(form.price) || 0,
      total_tickets: parseInt(form.total_tickets) || 100,
      tickets_sold: 0,
    });
    setLoading(false);
    toast({ title: "Event created!", description: "Your event is now live." });
    navigate("/creator");
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-lg mx-auto px-5 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/creator")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Create Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Event Image</Label>
            <label className="block w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer overflow-hidden bg-secondary">
              {form.image_url ? (
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          <InputField label="Event Title" placeholder="e.g. Summer Music Festival" value={form.title} onChange={(e) => update("title", e.target.value)} required />

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              placeholder="Tell people about your event..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="min-h-24 rounded-xl bg-secondary border-0 text-sm resize-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Category</Label>
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger className="h-12 rounded-xl bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required />
            <InputField label="Time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
          </div>

          <InputField label="Location" placeholder="e.g. Convention Center, NYC" value={form.location} onChange={(e) => update("location", e.target.value)} required />

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Price ($)" type="number" placeholder="0.00" value={form.price} onChange={(e) => update("price", e.target.value)} required />
            <InputField label="Total Tickets" type="number" placeholder="100" value={form.total_tickets} onChange={(e) => update("total_tickets", e.target.value)} />
          </div>

          <InputField label="Organizer Name" placeholder="Your name or brand" value={form.organizer_name} onChange={(e) => update("organizer_name", e.target.value)} />

          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25">
            {loading ? "Creating..." : "Publish Event"}
          </Button>
        </form>
      </div>
    </div>
  );
}