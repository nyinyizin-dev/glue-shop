import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import Cart from "@/components/shop/Cart";
import { Dimensions, ScrollView } from "react-native";
import Ttitle from "@/components/shop/Ttitle";
import { VStack } from "@/components/ui/vstack";
import { categories, products } from "@/data/index";
import { useCallback, useState } from "react";
import Category from "@/components/shop/Category";
import Product from "@/components/shop/Product";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react-native";
import { Box } from "@/components/ui/box";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const [select, setSelect] = useState(1);
  const width = Dimensions.get("screen").width;
  const numColumns = width < 600 ? 2 : width < 768 ? 3 : 4;

  const handleSelect = useCallback((id: number) => {
    setSelect(id);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HStack className="my-2 items-center justify-between px-5">
        <Pressable>
          <Image
            style={{ width: 56, height: 28 }}
            source={require("@/assets/images/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable className="mr-4">
          <Cart />
        </Pressable>
      </HStack>
      <ScrollView>
        <Image
          style={{ width: "100%", aspectRatio: 20 / 9 }}
          source={require("@/data/shop/banner6.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <VStack className="mt-4 px-5">
          <Ttitle title="Shop By Category" actionText="See All" />
          <FlashList
            data={categories}
            extraData={select}
            renderItem={({ item }) => (
              <Category {...item} select={select} onSelect={handleSelect} />
            )}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={90}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Ttitle title="Recomended for You" actionText="See All" />
          <FlashList
            data={products}
            numColumns={numColumns}
            renderItem={({ item }) => <Product {...item} />}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={300}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="mt-4"
            ListFooterComponent={() => (
              <Box className="h-40">
                <Button className="mx-auto rounded-lg bg-green-400">
                  <ButtonText className="font-bold" size="lg">
                    Explore More
                  </ButtonText>
                  <ButtonIcon as={MoveUpRight} className="ml-1 text-white" />
                </Button>
              </Box>
            )}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
