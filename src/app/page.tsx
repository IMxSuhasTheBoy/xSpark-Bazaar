import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex h-screen flex-col gap-y-4">
        <div>
          <Button variant="elevated">ss</Button>
        </div>
        <div>
          <Input placeholder="ssssss" />
        </div>
        <div>
          <p>xSpark-Bazaar testing components customization</p>
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="Textarea" />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
