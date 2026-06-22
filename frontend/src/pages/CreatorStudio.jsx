import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, DollarSign, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";
import { format } from "date-fns";

export default function CreatorStudio() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Event.list("-created_date", 50);
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const totalRevenue = events.reduce((sum, e) => sum + (e.price || 0) * (e.tickets_sold || 0), 0);
  const totalTicketsSold = events.reduce((sum, e) => sum + (e.tickets_sold || 0), 0);

  const handleDelete = async (id) => {
    await base44.entities.Event.delete(id);
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-5 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Creator Studio</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Manage your events</p>
          </div>
          <Button
            onClick={() => navigate("/creator/create")}
            className="h-10 px-4 rounded-xl font-semibold text-sm gap-1.5 shadow-md shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <p className="font-display text-xl font-bold text-card-foreground">{events.length}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Events</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-display text-xl font-bold text-card-foreground">${totalRevenue.toFixed(0)}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Revenue</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-display text-xl font-bold text-card-foreground">{totalTicketsSold}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Sold</p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          <h2 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Your Events
          </h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                <Calendar className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No events yet. Create your first!</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-card rounded-2xl p-4 border border-border/50 flex gap-3">
                <img
                  src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"}
                  alt={event.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                      event.status === "published" ? "bg-emerald-100 text-emerald-700" :
                      event.status === "draft" ? "bg-amber-100 text-amber-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {event.date ? format(new Date(event.date), "MMM dd, yyyy") : ""} • {event.tickets_sold || 0} sold
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => navigate(`/creator/edit/${event.id}`)}
                      className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-xs text-destructive font-medium flex items-center gap-1 hover:underline"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}