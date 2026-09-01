import {
    OrganizationCarousel,
    OrganizationCarouselItem,
    type OrganizationCardData,
} from "@/components/base/organizations/organizationcarousel"
import { OrganizationCard } from "@/components/base/organizations/card/organizationcard"
import { KeywordCombobox } from "@/components/ui/custom/keyword-combobox"

const organizations: OrganizationCardData[] = [
    {
        id: "org-1",
        name: "GDG Kolkata",
        logoSrc:
            "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=300&q=80",
        logoAlt: "GDG Kolkata logo",
        bannerSrc:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        bannerAlt: "GDG Kolkata banner",
        category: "Club",
        description: "Google Developer Group Kolkata",
        href: "/organizations/gdg-kolkata",
    },
    {
        id: "org-2",
        name: "GDG Bangalore",
        logoSrc:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80",
        logoAlt: "GDG Bangalore logo",
        bannerSrc:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        bannerAlt: "GDG Bangalore banner",
        category: "Community",
        description: "Google Developer Group Bangalore",
        href: "/organizations/gdg-bangalore",
    }
]

export default function OrganizationsPage() {
    return (
        <div className="min-h-dvh bg-background text-foreground md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-[100rem] space-y-8 px-2 pt-24 pb-4 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Organizations
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Discover communities and organizations.
                    </p>
                </div>
                <div className="space-y-6 mt-15">
                    <KeywordCombobox
                        queryRedirect
                        placeholder="Search organization or category"
                        className="p-3"
                        redirecturlTemplate="/organizations/search/?q={query}"
                        redirectmsgTemplate="Search {query} as organization"
                    />

                    <OrganizationCarousel title="New Organizations">
                        {organizations.map((organization) => (
                            <OrganizationCarouselItem key={organization.id}>
                                <OrganizationCard {...organization} />
                            </OrganizationCarouselItem>
                        ))}
                    </OrganizationCarousel>
                </div>
            </div>
        </div>
    )
}