/**
 * Task Provider Props
 */
import React from "react";

export interface TaskProps {
    details?: string;
    completed?: boolean;
    title?: string;
    readonly id: number;
}

export interface TaskDispatcherActionProps {
    type: "UPSERT" | "DELETE" | "MARK" | "RESET";
    payload?: TaskProps
}

export interface TaskContextProps {
    update: (taskProps: TaskProps) => void;
    remove: (id: number) => void;
    mark: (id: number) => void;
    fetch: (id: number) => TaskProps | null;
    getTasks: () => TaskProps[];
}

/**
 Page and component Interfaces
 */
export interface TaskFormProps {
    onSubmit: (fields: TaskProps) => void;
    activeTask?: TaskProps | null;
}

export interface TaskComponentProps {
    task: TaskProps;
    onMark: (id: number) => void;
    onEdit: (id: number) => void;
    onDetail: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}
