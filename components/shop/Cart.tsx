import { ShoppingCartIcon } from "lucide-react-native";

import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";

const Cart = () => {
  const totalItems = 2;

  return (
    <Box className="items-center">
      <VStack>
        <Badge
          className={`z-10 self-end ${totalItems > 9 ? "h-[28px] w-[28px]" : "h-[22px] w-[22px]"} -mb-3.5 -mr-3.5 rounded-full bg-red-600`}
          variant="solid"
        >
          <BadgeText className="font-bold text-white">{totalItems}</BadgeText>
        </Badge>
        <Icon as={ShoppingCartIcon} size="xl" />
      </VStack>
    </Box>
  );
};

export default Cart;
