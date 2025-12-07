import { Button } from "@/components/ui/button"

interface ChallengesTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobile?: boolean
}

export function ChallengesTabs({ activeTab, setActiveTab, isMobile = false }: ChallengesTabsProps) {
  if (isMobile) {
    return (
      <div className="flex rounded-full bg-[#1F1F1F] dark:bg-[#1F1F1F] bg-[#FFFFFF] p-1">
        <button
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
            activeTab === "explore" ? "bg-[#B829FA] text-white" : "dark:text-white text-[#1F1F1F]"
          }`}
          onClick={() => setActiveTab("explore")}
        >
          Explore
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${
            activeTab === "my-challenges" ? "bg-[#B829FA] text-white" : "dark:text-white text-[#1F1F1F]"
          }`}
          onClick={() => setActiveTab("my-challenges")}
        >
          My submissions
        </button>
      </div>
    )
  }

  return (
    <div className="flex rounded-full bg-[#1F1F1F] dark:bg-[#1F1F1F] bg-[#FFFFFF] p-1 w-fit mb-6">
      <button
        className={`py-2 px-6 rounded-full text-sm font-medium ${
          activeTab === "explore" ? "bg-[#B829FA] text-white" : "dark:text-white text-[#1F1F1F]"
        }`}
        onClick={() => setActiveTab("explore")}
      >
        Explore
      </button>
      <button
        className={`py-2 px-6 rounded-full text-sm font-medium ${
          activeTab === "my-challenges" ? "bg-[#B829FA] text-white" : "dark:text-white text-[#1F1F1F]"
        }`}
        onClick={() => setActiveTab("my-challenges")}
      >
        My submissions
      </button>
    </div>
  )
}

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  isMobile?: boolean
}

export function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  isMobile = false,
}: CategoryFilterProps) {
  if (isMobile) {
    return (
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 space-x-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={`rounded-full whitespace-nowrap ${
              selectedCategory === category ? "bg-[#B829FA] hover:bg-[#B829FA]/90" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all" ? "All Categories" : category}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={`rounded-full ${selectedCategory === category ? "bg-[#B829FA] hover:bg-[#B829FA]/90" : ""}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category === "all" ? "All Categories" : category}
        </Button>
      ))}
    </div>
  )
}

