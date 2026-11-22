import ExpandableText from "@/components/ui/expandable-text";

type PropertyDescriptionProps = {
  description: string;
};

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <section aria-labelledby="property-description-heading">
      <h2 id="property-description-heading" className="text-dark-blue text-xl font-semibold sm:text-2xl">
        Description
      </h2>
      <div className="mt-4 sm:mt-6">
        <ExpandableText
          text={description}
          className="text-grey sm:paragraph text-sm leading-6"
          collapsedClassName="max-h-30 sm:max-h-39"
        />
      </div>
    </section>
  );
}
