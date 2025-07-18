import { LoaderIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

import { Checkbox } from "@/components/ui/checkbox";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: TagsFilterProps) => {
  const trpc = useTRPC();
  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    trpc.tags.getMany.infiniteQueryOptions(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
        },
      },
    ),
  );

  // removes the tag from the list if it is already in the list, otherwise adds it to the list ( pr #14 for dup handlers issue )
  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isError ? (
        <div className="flex flex-col items-center justify-center p-4 text-red-500">
          <p>Failed to load tags</p>
          <button
            onClick={() => fetchNextPage()}
            className="mt-2 text-sm underline"
          >
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => onClick(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name)}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          )),
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          className="cursor-pointer justify-start text-start font-medium underline disabled:opacity-50"
          onClick={() => fetchNextPage()}
        >
          Load more...
        </button>
      )}
    </div>
  );
};
