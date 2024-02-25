"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, GripVertical, X } from "lucide-react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "sonner";

const TunkkiSelectedSongs = ({ selectedSongs, setSelectedSongs }) => {
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      selectedSongs,
      result.source.index,
      result.destination.index
    );

    setSelectedSongs(items);
  };

  const generateSongs = async () => {
    if (!selectedSongs.length) {
      return toast.info("Valitse ainakin yksi kappale");
    }
  };

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full bg-accent p-4 justify-between items-center rounded">
        <p className="text-sm">
          Valitut kappaleet:{" "}
          <span className="text-xl font-bold">{selectedSongs.length}</span>
        </p>

        <ChevronsUpDown size={20} />
      </CollapsibleTrigger>

      <CollapsibleContent className="fade-in bg-accent mt-1 rounded">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="songs">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {selectedSongs.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-2">
                          <GripVertical size={20} />
                          <p className="text-sm">{item.title}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => {
                              setSelectedSongs(
                                selectedSongs.filter(
                                  (song) => song.id !== item.id
                                )
                              );
                            }}
                            variant={"destructive"}
                            size={"icon"}
                            className="w-6 h-6"
                          >
                            <X size={20} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {selectedSongs.length === 0 && (
          <p className="text-sm pl-4 py-2 mt-2">Ei valittuja kappaleita</p>
        )}
      </CollapsibleContent>

      <Button onClick={generateSongs} className="w-full mt-2">
        Läsytä
      </Button>
    </Collapsible>
  );
};

export default TunkkiSelectedSongs;
