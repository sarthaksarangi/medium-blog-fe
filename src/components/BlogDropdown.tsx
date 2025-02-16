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
import DeleteAlert from "./DeleteAlert";
import { useNavigate } from "react-router-dom";

const BlogDropdown: React.FC<BlogPostMenuProps> = ({
  onDelete,
  disabled = false,
  id,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        navigate(`/edit/${id}`);
        setIsOpen(false);
      } catch (e) {
        console.error(
          `Error occurred while editing the blog post with id ${id}`,
          e
        );
      }
    },
    [id]
  );

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setShowDeleteAlert(true);
  }, []);

  const handleConfirmDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        onDelete(id);
      } catch (error) {
        console.error(
          `An error occured while deleting the post id ${id}`,
          error
        );
      } finally {
        setShowDeleteAlert(false);
      }
    },
    [onDelete, id]
  );

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteAlert(false);
  };

  const handleView = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/blog/${id}`);
      setIsOpen(false);
    },
    [navigate, id]
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
  }, [isOpen]);

  return (
    <>
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
            onClick={handleView}
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
            onClick={handleDeleteClick}
            className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
            disabled={disabled}
          >
            <Trash className="h-4 w-4 mr-1" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert
        showDeleteAlert={showDeleteAlert}
        setShowDeleteAlert={setShowDeleteAlert}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </>
  );
};

export default BlogDropdown;
