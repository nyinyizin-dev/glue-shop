import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { VStack } from "@/components/ui/vstack";
import ViewPager from "@/components/shop/ViewPager";
import { Pressable } from "@/components/ui/pressable";
import Cart from "@/components/shop/Cart";
import { Text } from "@/components/ui/text";
import { products, sizes } from "@/data";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Icon, FavouriteIcon, StarIcon, AddIcon, RemoveIcon } from "@/components/ui/icon";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@/components/ui/toast";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet';

const Detail = () => {
  const { id } = useLocalSearchParams();
  const [more, setMore] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const product = products.find((p) => p.id === +id);

  const [showActionsheet, setShowActionsheet] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const handleClose = () => setShowActionsheet(false);
  const submitHandler = () => setShowActionsheet(false);

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = (title: string, description: string) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(title,description);
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
            <ToastDescription>
              {description}
            </ToastDescription>
          </Toast>
        );
      },
    });
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
                setShowActionsheet(true)
                return;
              }
              const title = `Must choose ${colors.length === 0 ? 'color - ' : ""} ${sizes.length === 0 ? 'size - ' : ""}`
              const description = "Pelase set quantity just after choosing"
              handleToast(title,description)
            }}
          >
            <ButtonText>Set Quantity</ButtonText>
          </Button>
        </VStack>
      </ScrollView>

       <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
         <VStack className="w-full items-center justify-center pt-5">
          <Text bold>You choose colors and sizes</Text>
          <Text>{colors.join(', ')} - {sizes.join(', ')}</Text>
          <Text bold className="mt-8">Please set quantity</Text>
          <Text bold className="my-8" size='5xl'>{quantity}</Text>
          <HStack space='lg' className="w-full">
            <Button size='lg' className="flex-1 bg-sky-500" onPress={() => setQuantity(q => q + 1)}>
              <ButtonText>Increase</ButtonText>
              <ButtonIcon  as={AddIcon}/>
            </Button>
            <Button size='lg' className="flex-1 bg-sky-500" onPress={() => {if(quantity === 1) return; setQuantity(q => q - 1)}}>
              <ButtonText>Decrease</ButtonText>
              <ButtonIcon  as={RemoveIcon}/>
            </Button>
          </HStack>
          <Button size='lg' className="mt-6 mb-2 bg-green-500" onPress={submitHandler}>
              <ButtonText className="font-bold flex-1 text-center">Confirm</ButtonText>
          </Button>
          <Button size='lg' className=" mb-6 bg-gray-500" onPress={handleClose}>
              <ButtonText className="font-bold flex-1 text-center">Cancel</ButtonText>
          </Button>
         </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </VStack>
  );
};

export default Detail;
