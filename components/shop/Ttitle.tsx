import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "../ui/pressable";

type TutileProps = {
    title?: string;
    actionText?: string
}

const Ttitle = ({title, actionText}:TutileProps) => {
  return (
    <HStack className="justify-between items-center">
      <Text size='lg' className="font-medium text-black">{title}</Text>
      <Pressable>
        <Text>{actionText}</Text>
      </Pressable>
    </HStack>
  );
};

export default Ttitle;
