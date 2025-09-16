import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { carts } from "@/data";
import { HStack } from "@/components/ui/hstack";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CartScreen() {
  return (
    <SafeAreaView>
      {carts.length === 0 ? (
        <Text>Empty Cart</Text>
      ) : (
         <Box>
        <Heading className="text-center my-2">Shopping Cart - 4</Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space='md'>
          {carts.map(product => (
            <HStack key={product.id} className="justify-between">
              <VStack>
                <Image
                source={product.image}
                style={{ height: 50, aspectRatio: 3 / 4, borderRadius: 5 }}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                />
              </VStack>
              <HStack></HStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
      </Box>
      )}
     
    </SafeAreaView>
  );
}
