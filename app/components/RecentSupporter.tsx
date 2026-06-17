"use client";

import { useState, useTransition } from "react";
import { getReceivedDonations } from "@/actions/donation";
import { DonationWithDonor } from "@/types";

interface RecentSupportersProps {
  recipientId: number;
  creatorName: string;
  initialDonations: DonationWithDonor[];
  initialTotal: number;
}

const PAGE_SIZE = 3;

export function RecentSupporters({
  recipientId,
  creatorName,
  initialDonations,
  initialTotal,
}: RecentSupportersProps) {
  const [donations, setDonations] =
    useState<DonationWithDonor[]>(initialDonations);
  const [total, setTotal] = useState(initialTotal);
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const showSeeMore = total > PAGE_SIZE && !expanded;

  function handleSeeMore() {
    startTransition(async () => {
      const { donations: all, total: newTotal } = await getReceivedDonations(
        recipientId,
        100,
        0,
      );
      setDonations(all as DonationWithDonor[]);
      setTotal(newTotal);
      setExpanded(true);
    });
  }

  return (
    <div className='supporters-card'>
      <h3 className='supporters-title'>Recent Supporters</h3>

      {donations.length === 0 ?
        <div className='supporters-empty'>
          <span className='supporters-heart'>♥</span>
          <p>Be the first one to support {creatorName}</p>
        </div>
      : <div className='supporters-list'>
          {donations.map((d) => (
            <div
              key={d.id}
              className='supporter-row'
            >
              {d.donor.avatarUrl ?
                <img
                  src={d.donor.avatarUrl}
                  alt={d.donor.name}
                  className='supporter-avatar'
                />
              : <div className='supporter-avatar supporter-avatar-placeholder'>
                  {d.donor.name[0]}
                </div>
              }
              <div className='supporter-info'>
                <p className='supporter-name-line'>
                  <strong>{d.donor.name}</strong> bought ${d.amount} coffee
                </p>
                {d.specialMessage && (
                  <p className='supporter-message'>{d.specialMessage}</p>
                )}
              </div>
            </div>
          ))}

          {showSeeMore && (
            <button
              className='see-more-btn'
              onClick={handleSeeMore}
              disabled={isPending}
            >
              {isPending ? "Loading…" : "See more"}
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </button>
          )}
        </div>
      }
    </div>
  );
}
