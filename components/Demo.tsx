import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  TouchSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@mui/material";

export type TItem = {
  id: number;
  imageUrl: string;
};

type Props2 = {
  item: TItem;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, ...props }: Props2) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      ref={setNodeRef}
      style={styles}
      isDragging={isDragging}
      listeners={listeners}
      attributes={attributes}
      {...props}
    />
  );
};

type Props = {
  item: TItem;
  isDragging?: boolean;
  listeners?: any;
  attributes?: any;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  ({ item, isDragging, listeners, attributes, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          borderRadius: "8px",
          boxShadow: isDragging
            ? "none"
            : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
          overflow: "hidden",
          position: "relative",
        }}
        {...props}
      >
        {/* Draggable Area */}
        <div
          style={{
            height: "20px",
            background: "rgb(92, 38, 38)", // Optional: visual indication for draggable area
            cursor: "grab",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
          {...listeners}
          {...attributes}
        />

        {/* Non-Draggable Content */}
        <img
          src={item.imageUrl}
          alt={`${item.id}`}
          style={{
            display: "block",
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }
);

const defaultItems = [
  { id: 2, imageUrl: `https://picsum.photos/id/2/300/200` },
  { id: 15, imageUrl: `https://picsum.photos/id/15/300/200` },
  { id: 20, imageUrl: `https://picsum.photos/id/20/300/200` },
  { id: 24, imageUrl: `https://picsum.photos/id/24/300/200` },
  { id: 32, imageUrl: `https://picsum.photos/id/13/300/200` },
  { id: 35, imageUrl: `https://picsum.photos/id/48/300/200` },
  { id: 39, imageUrl: `https://picsum.photos/id/40/300/200` },
  { id: 43, imageUrl: `https://picsum.photos/id/43/300/200` },
  { id: 46, imageUrl: `https://picsum.photos/id/46/300/200` },
  { id: 52, imageUrl: `https://picsum.photos/id/52/300/200` },
  { id: 56, imageUrl: `https://picsum.photos/id/60/300/200` },
];

export default function Demo() {
  const [items, setItems] = useState<TItem[]>(defaultItems);

  // for drag overlay
  const [activeItem, setActiveItem] = useState<TItem>();

  // for input methods detection
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // triggered when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items.find((item) => item.id === active.id));
  };

  // triggered when dragging ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => arrayMove(prev, activeIndex, overIndex));
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const handleButtonClick = () => {
    const itemIds = items.map((item) => item.id);
    alert(itemIds);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(4, 1fr)`,
            gridGap: 16,
            maxWidth: "800px",
            margin: "16px auto 48px",
          }}
        >
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeItem ? <Item item={activeItem} isDragging /> : null}
      </DragOverlay>
      <Button onClick={handleButtonClick}>Show Item IDs</Button>
    </DndContext>
  );
}
