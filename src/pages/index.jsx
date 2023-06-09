import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getURL } from '@/utils';
import HomeLayout from '@/components/layout/homeLayout';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let productsData = {};
  let error = {};

  try {
    productsData = await fetch(`${getURL()}api/products`).then(res => res.json());
  } catch (error) {
    error = error;
  }

  return {
    props: {
      productsData,
      error,
      initialSession: session,
    },
  };
}

export default function Home({ productsData }) {
  return (
    <>
      <HomeLayout productsData={productsData} />
    </>
  );
}
