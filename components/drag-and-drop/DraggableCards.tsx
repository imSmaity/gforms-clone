import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useLayoutEffect, useMemo, useState } from "react";
import SortableItem, { ISave, Item } from "./SortableItem";
import {
  IQuestion,
  IUpdateQuestionsPositionAsync,
} from "@/lib/redux/form/types";
import { Box } from "@mui/material";

interface IDraggableCardsProps {
  questions: IQuestion[] | null;
  handleUpdatePosition: (data: IUpdateQuestionsPositionAsync) => void;
  formId: string;
  handleChangeQuestionData: ({ _id, data }: ISave) => void;
}

export default function DraggableCards({
  questions,
  formId,
  handleUpdatePosition,
  handleChangeQuestionData,
}: IDraggableCardsProps) {
  const initialActiveCard = Array.isArray(questions)
    ? String(questions[0]._id)
    : "-1";
  const [items, setItems] = useState<IQuestion[]>([]);
  const [activeCard, setActiveCard] = useState<string>(initialActiveCard);

  // for drag overlay
  const [activeItem, setActiveItem] = useState<IQuestion>();

  useLayoutEffect(() => {
    if (questions) {
      setItems(questions);
    }
  }, [questions]);

  // for input methods detection
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // triggered when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items.find((item) => item._id === active.id));
  };

  // triggered when dragging ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = items.findIndex((item) => item._id === active.id);
    const overIndex = items.findIndex((item) => item._id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => {
        const newItems = arrayMove(prev, activeIndex, overIndex);
        const newPositions = newItems.map((item) => String(item._id));
        // Api call for Update new position
        handleUpdatePosition({ formId, newPositions });

        return newItems;
      });
    }
    setActiveItem(undefined);
  };
  const itemsWithId = useMemo(() => {
    return items.map((item, index) => ({ ...item, id: item._id || index }));
  }, [items]);

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={itemsWithId} strategy={rectSortingStrategy}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "55%",
            gap: 2,
          }}
        >
          {itemsWithId.map((item) => (
            <SortableItem
              key={item._id}
              item={item}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              handleChangeQuestionData={handleChangeQuestionData}
            />
          ))}
        </Box>
      </SortableContext>
      <DragOverlay adjustScale={false} style={{ transformOrigin: "0 0 " }}>
        {activeItem ? (
          <Item
            item={activeItem}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            handleChangeQuestionData={handleChangeQuestionData}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
