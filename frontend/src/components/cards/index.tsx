import React, { HTMLProps, ReactElement, useContext, useId } from "react";
import { findChild } from "@/utils/children";

const CardContext = React.createContext({});

/**
 * Card component
 * Render a card with a header and body
 */
export function Card({ children }: CardProps) {
  const header = findChild(children, CardHeader);
  const body = findChild(children, CardBody);
  const cardId = useId();

  return (
    <CardContext.Provider value={{ id: cardId }}>
      <section
        aria-labelledby={cardId}
        className="flex flex-col my-4 bg-white shadow-md  dark:shadow-sm rounded-xl dark:bg-gray-800 dark:shadow-slate-700"
      >
        {header}
        {body}
      </section>
    </CardContext.Provider>
  );
}

/**
 * CardHeader component
 * Render the header section of a card
 */
export function CardHeader({ children, ...props }: HTMLProps<HTMLElement>) {
  const headerContent = typeof children === "string"
    ? <Heading>{children}</Heading>
    : children;

  return (
    <header
      className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700"
      {...props}
    >
      {headerContent}
    </header>
  );
}

/**
 * Render the body section of a card
 */
export function CardBody({ children }: HTMLProps<HTMLElement>) {
  return (
    <div className="p-4 md:p-5">
      {children}
    </div>
  );
}

/**
 * A generic heading for a card
 */
export function Heading({ children, level = 3 }: CardHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const cardContext = useContext(CardContext);

  return (
    <Tag
      id={cardContext.id}
      className="text-lg font-bold text-gray-800 dark:text-white"
    >
      {children}
    </Tag>
  );
}

type CardKids = ReactElement<typeof CardBody> | ReactElement<typeof CardHeader>;

type CardProps = HTMLProps<HTMLElement> & {
  children: CardKids | CardKids[];
};

type CardHeadingProps = HTMLProps<HTMLElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
