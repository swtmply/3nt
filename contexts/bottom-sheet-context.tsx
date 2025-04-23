import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet"; // Assuming you have this installed

// Define the type for the content you want to render.
// React.ReactNode can be anything renderable in React (elements, strings, numbers, etc.)
type BottomSheetContent = React.ReactNode | null;

interface BottomSheetContextType {
  openBottomSheet: (content: BottomSheetContent, snapIndex?: number) => void;
  closeBottomSheet: () => void;
  bottomSheetRef: React.RefObject<BottomSheetModal>; // Expose the ref
  snapPoints: string[] | number[]; // Expose snap points if needed
  content: React.ReactNode | null; // Expose the content if needed
  setContent: React.Dispatch<React.SetStateAction<BottomSheetContent>>; // Expose setContent if needed
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

// Provider component to wrap your application or a part of it
export const BottomSheetProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<BottomSheetContent>(null);

  // Define your snap points here
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const openBottomSheet = useCallback(
    (renderContent: BottomSheetContent, snapIndex = 0) => {
      setContent(renderContent);
      bottomSheetRef.current?.present();
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    // Optionally clear content when closed
    // setContent(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      openBottomSheet,
      closeBottomSheet,
      bottomSheetRef,
      snapPoints,
      content,
      setContent,
    }),
    [openBottomSheet, closeBottomSheet, snapPoints, content]
  );

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
    </BottomSheetContext.Provider>
  );
};

// Custom hook for consuming the context
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
