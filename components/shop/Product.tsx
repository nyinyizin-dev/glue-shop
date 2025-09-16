import { Image } from "expo-image";

import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { ProductType } from "@/types";
import { Icon, FavouriteIcon, StarIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Product = ({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  users,
}: ProductType) => {
 const router = useRouter()

  return (
    <Pressable className="mx-2 mb-4" onPress={()=> router.navigate({pathname: '/detail', params: {id}})}>
      <Card className="p-0">
        <Image
          source={image}
          style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 5 }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <Pressable className="absolute right-2 top-2 rounded-full bg-zinc-300/40">
          <Icon
            as={FavouriteIcon}
            className={`m-3 h-5 w-5 ${users.length > 0 && "fill-red-400"} text-red-400`}
          />
        </Pressable>
        <VStack space="xs" className="mt-2">
          <HStack space="sm" className="items-center">
            <Text className="font-semibold text-gray-500">{brand}</Text>
            <Icon as={StarIcon} size="xs" className="text-orange-500" />
            <Text size="sm">{star}</Text>
            <Text size="xs" className="text-gray-500">
              ({quantity})
            </Text>
          </HStack>
          <Text className="line-clamp-1">{title}</Text>
          <HStack space="sm" className="items-center">
            <Text className="font-medium text-green-700">${price.toFixed(2)}</Text>
            {discount > 0 && <Text size="sm" className="line-through text-gray-500">${discount.toFixed(2)}</Text>}
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
};

export default Product;
