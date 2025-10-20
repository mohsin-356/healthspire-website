import React from "react";

export function BookingPage() {
  React.useEffect(() => {
    const existing = document.getElementById("hl_form_embed_js");
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      s.async = true;
      s.id = "hl_form_embed_js";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24"></div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Schedule Your Appointment
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Book your consultation with HealthSpire - secure, convenient, and professional healthcare scheduling.
            </p>
          </div>

          {/* Booking form container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10">
              <div 
                className="w-full rounded-2xl overflow-hidden border border-gray-200"
                style={{ 
                  height: 'clamp(600px, 75vh, 900px)',
                  minHeight: '600px'
                }}
              >
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/qsCGQoeKZngfu2IBogfy"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    border: "none", 
                    overflow: "hidden",
                    display: "block"
                  }}
                  scrolling="no"
                  id="qsCGQoeKZngfu2IBogfy_1760678617157"
                  title="HealthSpire Booking"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm text-muted-foreground">
              Powered by HealthSpire • Secure & HIPAA Compliant • 24/7 Support Available
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div className="h-16 md:h-20"></div>
    </div>
  );
}
