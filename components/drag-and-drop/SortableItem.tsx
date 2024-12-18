import { IQuestion } from "@/lib/redux/form/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { forwardRef, HTMLAttributes, useState } from "react";
import QuestionSlide from "../slides/QuestionSlide";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { toObject } from "@/utils/modifyObjects";

export interface ISave {
  _id: string;
  data: IQuestion;
}

type Props = {
  item: IQuestion;
  handleChangeQuestionData: ({ _id, data }: ISave) => void;
  isDragging?: boolean;
  listeners?: any;
  attributes?: any;
  activeCard: string;
  setActiveCard: (v: string) => void;
} & HTMLAttributes<HTMLDivElement>;

type Props2 = {
  item: IQuestion;
  activeCard: string;
  setActiveCard: (v: string) => void;
  handleChangeQuestionData: ({ _id, data }: ISave) => void;
} & HTMLAttributes<HTMLDivElement>;

export const Item = forwardRef<HTMLDivElement, Props>(
  (
    {
      item,
      isDragging,
      handleChangeQuestionData,
      listeners,
      attributes,
      style,
      activeCard,
      setActiveCard,
      ...props
    },
    ref
  ) => {
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
            height: "20px", // Optional: visual indication for draggable area
            cursor: "grab",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            opacity: 0.25,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon style={{ transform: "rotate(90deg)" }} />
        </div>

        {/* Non-Draggable Content */}
        <QuestionSlide
          _id={String(item._id)}
          label={toObject(item.label)}
          key={item._id || item?.tempId}
          type={item.type}
          value={toObject(item.label)}
          options={item.options}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          handleSaveQuestion={handleChangeQuestionData} //handleChangeQuestionData
        />
      </div>
    );
  }
);

const SortableItem = ({ item, handleChangeQuestionData, ...props }: Props2) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id || 0,
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
      handleChangeQuestionData={handleChangeQuestionData}
      {...props}
    />
  );
};

export default SortableItem;
