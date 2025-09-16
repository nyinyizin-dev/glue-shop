import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { carts } from "@/data";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon, RemoveIcon, TrashIcon } from "@/components/ui/icon";
import { Fab, FabIcon } from "@/components/ui/fab";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {carts.length === 0 ? (
        <Text>Empty Cart</Text>
      ) : (
        <Box className="flex-1">
          <Heading className="mt-2 mb-6 text-center">Shopping Cart - 4</Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="md">
              {carts.map((product) => (
                <HStack
                  key={product.id}
                  className="justify-between rounded-md border-2 border-gray-200 px-4 py-2"
                >
                  <VStack className="w-1/4">
                    <Image
                      source={product.image}
                      style={{
                        width: "50%",
                        aspectRatio: 3 / 4,
                        borderRadius: 5,
                      }}
                      placeholder={blurhash}
                      contentFit="cover"
                      transition={1000}
                    />
                    <Text className="line-clamp-1">{product.title}</Text>
                  </VStack>
                  <VStack className="w-3/4 pl-2" space="md">
                    {product.items.map((item) => (
                      <HStack
                        key={item.id}
                        className="items-center justify-center"
                        space="3xl"
                      >
                        <VStack>
                          <Text size="sm" className="font-light">
                            {item.color} - {item.size}
                          </Text>
                          <Text className="text-gray-500">
                            ${product.price} x {item.quantity}
                          </Text>
                        </VStack>
                        <HStack className="items-center" space="sm">
                          <Button
                            size="xs"
                            className="border-gray-300"
                            variant="outline"
                          >
                            <ButtonIcon as={AddIcon} />
                          </Button>
                          <Text size="lg">{item.quantity}</Text>
                          <Button
                            size="xs"
                            className="border-gray-300"
                            variant="outline"
                          >
                            <ButtonIcon as={RemoveIcon} />
                          </Button>
                          <Button size="sm" className="ml-2" variant="link">
                            <ButtonIcon as={TrashIcon} />
                          </Button>
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </HStack>
              ))}
            </VStack>
            <VStack >
              <HStack className="my-2 justify-between">
                <Text bold>Total Price</Text>
                <Text bold>${3000}</Text>
              </HStack>
              <Button size="lg" className="bg-green-500">
                <ButtonText>Checkout</ButtonText>
              </Button>
            </VStack>
          </ScrollView>
          <Fab size="md" placement="bottom right" className="mb-16 bg-red-400">
            <FabIcon as={TrashIcon} />
          </Fab>
        </Box>
      )}
    </SafeAreaView>
  );
}
