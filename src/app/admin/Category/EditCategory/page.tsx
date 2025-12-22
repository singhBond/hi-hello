// app/admin/adminpanel/components/EditCategoryDialog.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Pencil, X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

/* =======================
   Types
======================= */

export interface Category {
  id: string;
  name?: string;
  imageUrl?: string;
}

interface EditCategoryDialogProps {
  category: Category;
}

/* =======================
   Helpers
======================= */

// Capitalize category name
const formatName = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

// Compress image to < 500 KB
const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");

      let { width, height } = img;
      const MAX = 1200;

      if (width > height && width > MAX) {
        height = (height * MAX) / width;
        width = MAX;
      } else if (height > MAX) {
        width = (width * MAX) / height;
        height = MAX;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.9;
      const TARGET = 500 * 1024;

      const attempt = () => {
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const size = (dataUrl.length * 3) / 4;

        if (size <= TARGET || quality <= 0.1) {
          resolve(dataUrl);
        } else {
          quality -= 0.1;
          attempt();
        }
      };

      attempt();
    };

    reader.onerror = reject;
    img.onerror = reject;
    reader.readAsDataURL(file);
  });

/* =======================
   Component
======================= */

export default function EditCategoryDialog({
  category,
}: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name ?? "");
  const [image, setImage] = useState<string | null>(
    category.imageUrl ?? null
  );
  
  const [preview, setPreview] = useState(category.imageUrl ?? "");
  const [sizeInfo, setSizeInfo] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      setName(category.name ?? "");
      setImage(category.imageUrl ?? null);
      setPreview(category.imageUrl ?? "");
      setSizeInfo("");
    }
  }, [open, category]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
      setPreview(compressed);
      setSizeInfo(`~${((compressed.length * 0.75) / 1024).toFixed(1)} KB`);
    } catch {
      alert("Image processing failed");
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !image) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, "categories", category.id), {
        name: formatName(name),
        imageUrl: image,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update category name and image
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Image */}
          <div className="space-y-3">
            <Label>
              Category Image <span className="text-red-500">*</span>
            </Label>

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Category preview"
                  className="h-64 w-full rounded-lg object-cover border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                    setSizeInfo("");
                  }}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white"
                >
                  <X size={16} />
                </button>
                {sizeInfo && (
                  <p className="text-center text-xs text-gray-500 mt-2">
                    {sizeInfo}
                  </p>
                )}
              </div>
            ) : (
              <div
                onClick={() =>
                  document
                    .getElementById("edit-category-image")
                    ?.click()
                }
                className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:border-yellow-500"
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500">
                  Auto-compressed &lt; 500 KB
                </p>
              </div>
            )}

            <Input
              id="edit-category-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !name.trim() || !image}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
