import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import {
  AddIcon,
  CheckIcon,
  CloseCircleIcon,
  FavouriteIcon,
  Icon,
  RemoveIcon,
  StarIcon,
} from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { products } from "@/data";
import useCartStore from "@/store/cartStore";
import type { CartItem } from "@/types";
import { ScrollView } from "react-native";

const Detail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [more, setMore] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const product = products.find((p) => p.id === +id);
  const { addToCart } = useCartStore();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [showActionsheet, setShowActionsheet] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleClose = () => setShowActionsheet(false);
  const submitHandler = () => {
    setShowActionsheet(false);
    if (quantity === 0) return;
    colors.forEach((color) => {
      sizes.forEach((size) => {
        setCart((prev) => [
          { id: Math.random(), color, size, quantity },
          ...prev,
        ]);
      });
    });
    // Reset
    setColors([]);
    setSizes([]);
    setQuantity(1);
  };

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = (title: string, description: string) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(title, description);
    }
  };
  const showNewToast = (title: string, description: string) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId.toString(),
      placement: "bottom",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  const addCartToStore = () => {
    if (cart.length === 0) {
      handleToast("Cart is empty", "Please add items to your cart first");
      return;
    }

    const cartProduct = {
      id: product!.id,
      title: product!.title,
      image: product!.image,
      price: product!.price,
      items: cart,
    };

    addToCart(cartProduct);
    setCart([]);
    router.back();
  };

  return (
    <VStack className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "Product Detail",
          headerBackTitle: "Home",
          headerRight: () => (
            <Pressable className="mr-4">
              <Cart />
            </Pressable>
          ),
        }}
      />
      <ViewPager />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="xs" className="mt-2 px-5">
          <HStack className="items-center justify-between">
            <HStack space="sm" className="items-center">
              <Text className="font-semibold text-gray-500">
                {product?.brand}
              </Text>
              <Icon as={StarIcon} size="xs" className="text-orange-500" />
              <Text size="sm">{product?.star}</Text>
              <Text size="xs" className="text-gray-500">
                ({product?.quantity})
              </Text>
            </HStack>
            <Pressable>
              <Icon
                as={FavouriteIcon}
                className={`mr-2 h-5 w-5 ${product!.users?.length > 0 && "fill-red-400"} text-red-400`}
              />
            </Pressable>
          </HStack>
          <Text className="line-clamp-1 font-medium">{product?.title}</Text>
          <HStack space="sm" className="items-center">
            <Text className="font-medium text-green-700">
              ${product?.price.toFixed(2)}
            </Text>
            {product?.discount! > 0 && (
              <Text size="sm" className="text-gray-500 line-through">
                ${product?.discount.toFixed(2)}
              </Text>
            )}
          </HStack>
          <VStack>
            <Text className={`${!more && "line-clamp-3"}`}>
              {product?.description}
            </Text>
            <Pressable onPress={() => setMore((p) => !p)}>
              <Text italic>{more ? "See less" : "See more"}</Text>
            </Pressable>
          </VStack>
          <Text className="mb-1 mt-2 font-medium">Choose Color</Text>
          <CheckboxGroup
            value={colors}
            onChange={(keys) => {
              setColors(keys);
            }}
          >
            <HStack space="xl">
              {product?.colors.map((item) => (
                <Checkbox
                  value={item.name}
                  key={item.id}
                  isDisabled={!item.stock}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{item.name}</CheckboxLabel>
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>

          <Text className="mb-1 mt-2 font-medium">Choose Sizes</Text>
          <CheckboxGroup
            value={sizes}
            onChange={(keys) => {
              setSizes(keys);
            }}
          >
            <HStack space="xl">
              {product?.sizes.map((item) => (
                <Checkbox
                  value={item.name}
                  key={item.id}
                  isDisabled={!item.stock}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{item.name}</CheckboxLabel>
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>
          <Button
            size="lg"
            className="mt-6 self-start rounded-lg bg-sky-500"
            onPress={() => {
              if (colors.length > 0 && sizes.length > 0) {
                setShowActionsheet(true);
                return;
              }
              const title = `Must choose ${colors.length === 0 ? "color - " : ""} ${sizes.length === 0 ? "size - " : ""}`;
              const description = "Pelase set quantity just after choosing";
              handleToast(title, description);
            }}
          >
            <ButtonText>Set Quantity</ButtonText>
          </Button>
          {totalItems > 0 && (
            <Text size="md" className="ml-2 font-semibold text-gray-500">
              Total Price - ${Number(product!.price.toFixed(2)) * totalItems}
            </Text>
          )}
          {cart.length > 0 && (
            <VStack space={"sm"} className="mt-4">
              {cart.map((c) => (
                <HStack
                  key={c.id}
                  className="items-center justify-between rounded-md bg-slate-100 px-2 py-1"
                >
                  <HStack space="sm" className="items-center">
                    {/* <Icon as={AddIcon} size="md" /> */}
                    <Button
                      size="md"
                      className=""
                      variant="link"
                      onPress={() =>
                        setCart((prev) =>
                          prev.map((item) =>
                            item.id === c.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item,
                          ),
                        )
                      }
                    >
                      <ButtonIcon as={AddIcon} />
                    </Button>
                    <Text>
                      {c.color} - {c.size} ( {c.quantity} )
                    </Text>

                    <Button
                      size="md"
                      className=""
                      variant="link"
                      onPress={() =>
                        setCart((prev) =>
                          prev.map((item) =>
                            item.id === c.id && item.quantity > 1
                              ? { ...item, quantity: item.quantity - 1 }
                              : item,
                          ),
                        )
                      }
                    >
                      <ButtonIcon as={RemoveIcon} />
                    </Button>
                  </HStack>
                  <Button
                    size="md"
                    className="mr-4"
                    variant="link"
                    onPress={() =>
                      setCart((prev) => prev.filter((item) => item.id !== c.id))
                    }
                  >
                    <ButtonIcon as={CloseCircleIcon} />
                  </Button>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
        <Box className="h-40" />
      </ScrollView>
      <Fab
        size="md"
        placement="bottom right"
        className="mb-24 bg-green-500"
        onPress={addCartToStore}
      >
        <FabIcon as={AddIcon} />
        <FabLabel bold>Add To Cart</FabLabel>
      </Fab>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full items-center justify-center pt-5">
            <Text bold>You choose colors and sizes</Text>
            <Text>
              {colors.join(", ")} - {sizes.join(", ")}
            </Text>
            <Text bold className="mt-8">
              Please set quantity
            </Text>
            <Text bold className="my-8" size="5xl">
              {quantity}
            </Text>
            <HStack space="lg" className="w-full">
              <Button
                size="lg"
                className="flex-1 bg-sky-500"
                onPress={() => setQuantity((q) => q + 1)}
              >
                <ButtonText>Increase</ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-sky-500"
                onPress={() => {
                  if (quantity === 1) return;
                  setQuantity((q) => q - 1);
                }}
              >
                <ButtonText>Decrease</ButtonText>
                <ButtonIcon as={RemoveIcon} />
              </Button>
            </HStack>
            <Button
              size="lg"
              className="mb-2 mt-6 bg-green-500"
              onPress={submitHandler}
            >
              <ButtonText className="flex-1 text-center font-bold">
                Confirm
              </ButtonText>
            </Button>
            <Button
              size="lg"
              className="mb-6 bg-gray-500"
              onPress={handleClose}
            >
              <ButtonText className="flex-1 text-center font-bold">
                Cancel
              </ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </VStack>
  );
};

export default Detail;
