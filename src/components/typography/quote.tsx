export type QuoteProps = React.HTMLAttributes<HTMLQuoteElement>;

export function Quote({ className, ...props }: QuoteProps) {
  return <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />;
}
