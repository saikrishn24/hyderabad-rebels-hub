import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import gallery images
import starPerformers1 from "@/assets/gallery/star-performers-1.jpeg";
import starPerformers2 from "@/assets/gallery/star-performers-2.jpeg";
import starPerformers3 from "@/assets/gallery/star-performers-3.jpeg";
import starPerformers4 from "@/assets/gallery/star-performers-4.jpeg";
import starPerformers5 from "@/assets/gallery/star-performers-5.jpeg";
import teamPhoto from "@/assets/gallery/team-photo.jpeg";

const galleryImages = [
  { id: 1, src: teamPhoto, category: "Team", title: "Team Photo 2025", subtitle: "Hyderabad Rebels Squad" },
  { id: 2, src: starPerformers1, category: "Star Performers", title: "Vamshi & Sandeep", subtitle: "Match Day Heroes" },
  { id: 3, src: starPerformers2, category: "Star Performers", title: "Sai Krishna & Aravind", subtitle: "LCL T20 Summer 2025" },
  { id: 4, src: starPerformers3, category: "Star Performers", title: "Sanjeevi & Siddu", subtitle: "LCL T20 Summer 2025" },
  { id: 5, src: starPerformers4, category: "Star Performers", title: "Siddu & Abhi", subtitle: "TDCA League Match" },
  { id: 6, src: starPerformers5, category: "Star Performers", title: "Bhanu, Sai Krishna & Avinash", subtitle: "LCL T20 Summer 2025" },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">MEMORIES</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            PHOTO <span className="text-gradient-crimson">GALLERY</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Capturing the moments of glory, hard work, and team spirit.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square cursor-pointer group overflow-hidden rounded-lg ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Image */}
              <img 
                src={image.src} 
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-gold font-semibold tracking-wider mb-1">{image.category}</p>
                <p className="font-display text-lg font-bold text-foreground text-center">{image.title}</p>
                {image.subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">{image.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={galleryImages[selectedImage].src} 
                alt={galleryImages[selectedImage].title}
                className="w-full max-h-[70vh] object-contain rounded-xl"
              />
              <div className="text-center mt-6">
                <p className="text-gold font-semibold tracking-wider mb-1">{galleryImages[selectedImage].category}</p>
                <p className="font-display text-2xl font-bold text-foreground">{galleryImages[selectedImage].title}</p>
                {galleryImages[selectedImage].subtitle && (
                  <p className="text-muted-foreground mt-1">{galleryImages[selectedImage].subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
