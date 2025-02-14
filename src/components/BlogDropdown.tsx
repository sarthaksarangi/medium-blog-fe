import { BlogPostMenuProps } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, Ellipsis, Trash, View } from "lucide-react";

const BlogDropdown: React.FC<BlogPostMenuProps> = ({
  onEdit,
  onDelete,
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        onEdit();
        setIsOpen(false);
      } catch (e) {
        console.error(
          `Error occurred while editing the blog post with id ${id}`,
          e
        );
      }
    },
    [onEdit, id]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        onDelete();
        setIsOpen(false);
      } catch (error) {
        console.error(
          `An error occured while deleting the post id ${id}`,
          error
        );
      }
    },
    [onDelete, id]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={disabled}
          aria-label="Open menu"
        >
          <span className="sr-only">Open menu</span>
          <Ellipsis className="h-5 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleEdit}
          className="flex items-center cursor-pointer"
          disabled={disabled}
        >
          <View className="h-4 w-4 mr-1 text-green-600" />
          <span>View</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleEdit}
          className="flex items-center cursor-pointer"
          disabled={disabled}
        >
          <Edit className="h-4 w-4 mr-1" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="lex items-center cursor-pointer text-red-600 focus:text-red-600"
          disabled={disabled}
        >
          <Trash className="h-4 w-4 mr-1" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogDropdown;
