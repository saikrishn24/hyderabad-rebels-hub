import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const galleryImages = [
  { id: 1, category: "Match", title: "Championship Final 2023" },
  { id: 2, category: "Practice", title: "Morning Training Session" },
  { id: 3, category: "Celebration", title: "Victory Celebration" },
  { id: 4, category: "Match", title: "Semi-Final Action" },
  { id: 5, category: "Team", title: "Team Photo 2024" },
  { id: 6, category: "Match", title: "Bowling Excellence" },
];

// Placeholder gradient backgrounds for gallery items
const gradients = [
  "from-primary/30 to-gold/20",
  "from-gold/30 to-primary/20",
  "from-green-500/30 to-primary/20",
  "from-primary/20 to-blue-500/30",
  "from-gold/20 to-green-500/30",
  "from-blue-500/20 to-primary/30",
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
              {/* Placeholder gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-12 w-12 text-foreground/30" />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <p className="text-xs text-gold font-semibold tracking-wider mb-1">{image.category}</p>
                <p className="font-display text-lg font-bold text-foreground text-center px-4">{image.title}</p>
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
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${gradients[selectedImage % gradients.length]} flex items-center justify-center`}>
                <Camera className="h-24 w-24 text-foreground/30" />
              </div>
              <div className="text-center mt-6">
                <p className="text-gold font-semibold tracking-wider mb-1">{galleryImages[selectedImage].category}</p>
                <p className="font-display text-2xl font-bold text-foreground">{galleryImages[selectedImage].title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
