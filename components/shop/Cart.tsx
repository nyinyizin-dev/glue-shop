import { useRouter } from "expo-router";
import { ShoppingCartIcon } from "lucide-react-native";

import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import useCartStore from "@/store/cartStore";

const Cart = () => {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Pressable
      className="items-center"
      onPress={() => router.navigate("/cart")}
    >
      <VStack>
        {totalItems > 0 && (
          <Badge
            className={`z-10 self-end ${totalItems > 9 ? "h-[28px] w-[28px]" : "h-[22px] w-[22px]"} -mb-3.5 -mr-3.5 rounded-full bg-red-600`}
            variant="solid"
          >
            <BadgeText className="font-bold text-white">{totalItems}</BadgeText>
          </Badge>
        )}
        <Icon as={ShoppingCartIcon} size="xl" />
      </VStack>
    </Pressable>
  );
};

export default Cart;
