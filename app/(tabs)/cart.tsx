import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
// import { carts } from "@/data";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, Icon, RemoveIcon, TrashIcon } from "@/components/ui/icon";
import useCartStore from "@/store/cartStore";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CartScreen() {
  const {
    carts,
    getTotalItems,
    getTotalPrice,
    clearCart,
    updateCart,
    removeFromCart,
  } = useCartStore();
  const [deleteProduct, setDeleteProduct] = useState<{
    productId: number;
    itemId: number;
  } | null>(null);
  const router = useRouter();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const hadndleDelete = () => {
    if (deleteProduct) {
      removeFromCart(deleteProduct!.productId, deleteProduct!.itemId);
    }
    setShowAlertDialog(false);
  };

  const deleteAllCarts = () => {
    Alert.alert(
      "Delete All Carts",
      "Are you sure you want to delete all carts?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            clearCart();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {carts.length === 0 ? (
        <Box className="flex-1 items-center justify-center">
          <Heading className="mb-4 text-center">Your Cart is Empty</Heading>
          <Text className="mb-6 text-center text-gray-500">
            Add some products to your cart to see theme here.
          </Text>
          <Button
            size="lg"
            className="bg-blue-500"
            onPress={() => router.navigate("/")}
          >
            <ButtonText>Go to Shop</ButtonText>
          </Button>
        </Box>
      ) : (
        <Box className="flex-1">
          <Heading className="mb-6 mt-2 text-center">
            Shopping Cart - {getTotalItems()}
          </Heading>
          <Fab
            size="md"
            placement="bottom right"
            className="mb-16 bg-red-400"
            onPress={deleteAllCarts}
          >
            <FabIcon as={TrashIcon} />
          </Fab>
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
                        className="items-center"
                        space="3xl"
                      >
                        <VStack className="w-1/3 items-end">
                          <Text size="sm" className="font-light">
                            {item.color} - {item.size}
                          </Text>
                          <Text className="text-gray-500">
                            ${product.price} x {item.quantity}
                          </Text>
                        </VStack>
                        <HStack className="w-2/3 items-center" space="sm">
                          <Button
                            size="xs"
                            className="border-gray-300"
                            variant="outline"
                            onPress={() =>
                              updateCart(product.id, item.id, item.quantity + 1)
                            }
                          >
                            <ButtonIcon as={AddIcon} />
                          </Button>
                          <Text size="lg">{item.quantity}</Text>
                          {/* delete button */}
                          <Button
                            size="xs"
                            className="border-gray-300"
                            variant="outline"
                            onPress={() =>
                              updateCart(product.id, item.id, item.quantity - 1)
                            }
                            isDisabled={item.quantity <= 1 ? true : false}
                          >
                            <ButtonIcon as={RemoveIcon} />
                          </Button>
                          <Button
                            size="sm"
                            className="ml-2"
                            variant="link"
                            onPress={() => {
                              setDeleteProduct({
                                productId: product.id,
                                itemId: item.id,
                              });
                              setShowAlertDialog(true);
                            }}
                          >
                            <ButtonIcon as={TrashIcon} />
                          </Button>
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </HStack>
              ))}
            </VStack>
            <VStack>
              <HStack className="my-2 justify-between">
                <Text bold>Total Price</Text>
                <Text bold>${getTotalPrice()}</Text>
              </HStack>
              <Button size="lg" className="bg-green-500">
                <ButtonText>Checkout</ButtonText>
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      )}

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full max-w-[415px] items-center gap-4">
          <Box className="h-[52px] w-[52px] items-center justify-center rounded-full bg-background-error">
            <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader className="mb-2">
            <Heading size="md">Delete this item?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center">
              Are you sure? This product will be deleted from your cart. This
              cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button
              size="sm"
              action="negative"
              onPress={hadndleDelete}
              className="px-[30px]"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="px-[30px]"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}
