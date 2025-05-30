import { Tabs } from "expo-router";
import { Clock, Wallet } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import "./styles/global.css";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import db from "~/server/db";
import migrations from "~/server/db/drizzle/migrations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  useFonts,
} from "@expo-google-fonts/geist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  BottomSheetProvider,
  useBottomSheet,
} from "~/contexts/bottom-sheet-context";
import { PortalHost } from "@rn-primitives/portal";
import { expo } from "~/server/db";

function TabsLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  useDrizzleStudio(expo);

  const activeTintColor = isDarkColorScheme ? "white" : "black";
  const inactiveTintColor = isDarkColorScheme ? "gray" : "darkgray";

  const { content, bottomSheetRef } = useBottomSheet();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.8}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            height: 100,
            paddingVertical: 0,
            backgroundColor: isDarkColorScheme ? "black" : "white",
          },
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarItemStyle: {
            height: "100%",
            padding: 0,
            margin: 0,
          },
          tabBarIconStyle: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: (props) => <Wallet {...props} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: (props) => <Clock {...props} />,
          }}
        />
      </Tabs>
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={["55%", "100%"]}
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          handleStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].background
              : NAV_THEME["light"].background,
          }}
          handleIndicatorStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].text
              : NAV_THEME["light"].text,
          }}
          backgroundStyle={{
            backgroundColor: isDarkColorScheme
              ? NAV_THEME["dark"].background
              : NAV_THEME["light"].background,
          }}
        >
          {content}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { success: migrationSuccess, error: migrationError } = useMigrations(
    db,
    migrations
  );
  useReactQueryDevTools(queryClient);

  const [fontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  });

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      if (fontsLoaded) {
        console.log("[Fonts]: Fonts are loaded correctly");
      }

      if (migrationSuccess) {
        console.log("[Database]: Migration of database is successful");
      }

      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }

    if (migrationError) {
      console.error(
        "[Error]: Something went wrong when migrating the database",
        JSON.stringify(migrationError, null, 2)
      );
      return;
    }

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <GestureHandlerRootView className="flex-1">
          <BottomSheetProvider>
            <TabsLayout />
          </BottomSheetProvider>
        </GestureHandlerRootView>

        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
