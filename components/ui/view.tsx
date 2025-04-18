import { View as RNView } from "react-native";
import { cn } from "~/lib/utils";

type ViewProps = React.ComponentPropsWithoutRef<typeof RNView>;

const View = ({ className, ...props }: ViewProps) => {
  return <RNView className={cn(className)} {...props} />;
};
View.displayName = "View";

export { View };
export type { ViewProps };
