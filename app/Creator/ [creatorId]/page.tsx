import { notFound } from "next/navigation";
import { getCreatorProfile, getCreatorDonations } from "@/actions/donation";
import { CreatorProfile } from "@/components/CreatorProfile";
import { RecentSupporters } from "@/components/RecentSupporters";
import { DonationFlow } from "@/components/DonationFlow";
import { getServerSession } from "next-auth"; // adjust to your auth provider
import { authOptions } from "@/lib/auth"; // adjust to your auth config

interface CreatorPageProps {
  params: { creatorId: string };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { creatorId } = params;

  const [creator, { donations, total }, session] = await Promise.all([
    getCreatorProfile(creatorId),
    getCreatorDonations(creatorId, 3, 0),
    getServerSession(authOptions),
  ]);

  if (!creator) notFound();

  const currentUserId = session?.user?.id as string | undefined;
  const isOwner = currentUserId === creatorId;

  return (
    <main className='creator-page'>
      {/* Teal banner */}
      <div className='creator-banner' />

      <div className='creator-layout'>
        {/* Left column */}
        <div className='creator-left'>
          <CreatorProfile
            creator={creator}
            isOwner={isOwner}
          />

          <RecentSupporters
            creatorId={creatorId}
            creatorName={creator.name}
            initialDonations={donations}
            initialTotal={total}
          />
        </div>

        {/* Right column */}
        <div className='creator-right'>
          {currentUserId ?
            <DonationFlow
              creator={creator}
              currentUserId={currentUserId}
            />
          : <div className='donation-form-card'>
              <h2 className='donation-title'>Buy {creator.name} a Coffee</h2>
              <p className='login-prompt'>
                Please{" "}
                <a
                  href='/login'
                  className='login-link'
                >
                  log in
                </a>{" "}
                to support {creator.name}.
              </p>
            </div>
          }
        </div>
      </div>
    </main>
  );
}
