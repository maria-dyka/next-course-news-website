import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news"

import Link from "next/link";
import { Suspense } from "react";

async function FilterHeader({ year, month }) {
  const awailableYears = await getAvailableNewsYears();
  let links = awailableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  if (year && !awailableYears.includes(year) || month && !getAvailableNewsMonths(year).includes(month)) {
    throw new Error('Invalid filters.');
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

async function FilteredNews({ year, month }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for a given year.</p>

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }

  return newsContent;
};

export default async function FilteredNewsList({ params }) {
  const filter = params.filter;

  const newsYear = filter?.[0];
  const newsMonth = filter?.[1];

  return <>
    {/* <Suspense fallback={<p>Loading filters...</p>}>
      <FilterHeader year={newsYear} month={newsMonth}/>
    </Suspense> */}
    <Suspense fallback={<p>Loading news...</p>}>
      <FilterHeader year={newsYear} month={newsMonth}/>
      <FilteredNews year={newsYear} month={newsMonth} />
    </Suspense>
  </>
}