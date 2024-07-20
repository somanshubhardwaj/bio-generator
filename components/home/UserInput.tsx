"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogosMetaIcon } from "../icons/Meta";
import { LogosMistralAiIcon } from "../icons/Mistral";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info, InfoIcon, Loader2Icon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { generateBio } from "@/app/actions";
import { BioContext } from "@/context/BioContent";

const formSchema = z.object({
  model: z.string().min(1, "Model is required").max(100),
  temperature: z.number().min(0).max(2),
  content: z.string().min(50, "Content must be minimum 50 character").max(500),
  type: z.enum(["Personal", "Brand"], { message: "Type is required" }),
  tone: z.enum(
    [
      "Professional",
      "casual",
      "sarcastic",
      "funny",
      "passionate",
      "thoughtful",
    ],
    { message: "Type is required" }
  ),
  emojis: z.boolean(),
});
const UserInput = () => {
  const { setLoading, setOutput, output, loading } = useContext(BioContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      temperature: 1,
      content: "",
      type: "Personal",
      tone: "Professional",
      emojis: false,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
    const userInput = ` user input: ${values.content},
    Bio type: ${values.type},
    Bio Tone: ${values.tone},
    Add Emojis: ${values.emojis},
    
    `;
    try {
      const { data } = await generateBio(
        userInput,
        values.temperature,
        values.model
      );
      setOutput(data);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="relative flex flex-col items-start gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/70 backdrop-blur-sm">
            <legend>Setting</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start gap-2">
                              <LogosMetaIcon className="w-6 h-6" />
                              <p> llama3-8b</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start gap-2">
                              <LogosMetaIcon className="w-6 h-6" />
                              <p> llama3-70b</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="mixtral-8x7b-32768">
                            <div className="flex items-start gap-2">
                              <LogosMistralAiIcon className="w-6 h-6" />
                              <p> Mixtral</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <span className="flex items-center gap-2">
                        Creativity
                      </span>
                      <span>{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => field.onChange(val[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="grid rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend>User Input</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Yourself</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        {...field}
                        className="min-h-[10rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Brand">Brand</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="sarcastic">Sarcastic</SelectItem>
                          <SelectItem value="funny">Funny</SelectItem>
                          <SelectItem value="passionate">Passionate</SelectItem>
                          <SelectItem value="thoughtful">Thoughtful</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3 my-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-1">
                    <FormLabel className="text-sm ">Add Emojis</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!my-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <div className="grid gap-3">
            <Button type="submit" disabled={loading} >
              {loading && <Loader2Icon className="animate-spin w-4 h-4 mr-2" />}
              Generate</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
