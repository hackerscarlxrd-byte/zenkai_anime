import React from 'react';

const LegalPage = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-24 max-w-4xl min-h-screen">
      <div className="bg-background-secondary rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-8 relative z-10 tracking-tight">
          {title}
        </h1>
        
        <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:font-display prose-headings:font-black prose-a:text-primary hover:prose-a:text-primary/80 relative z-10 max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-li:text-text-secondary prose-strong:text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
