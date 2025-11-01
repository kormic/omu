import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET = process.env.EXPO_PUBLIC_SECRET;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);

async function seed() {
	console.log('🌱 Seeding users...');

	// 1. Create users via Supabase Auth
	const { data: giver, error: giverErr } = await supabase.auth.admin.createUser({
		email: 'giver@example.com',
		password: 'password123',
		email_confirm: true,
	});
	if (giverErr) throw giverErr;

	const { data: taker, error: takerErr } = await supabase.auth.admin.createUser({
		email: 'taker@example.com',
		password: 'password123',
		email_confirm: true,
	});
	if (takerErr) throw takerErr;

	// 2. Sync app "users" table
	const { error: usersErr } = await supabase.from('users').insert([
		{ id: giver.user.id, name: 'Alice Giver', role: 'giver' },
		{ id: taker.user.id, name: 'Bob Taker', role: 'taker' },
	]);
	if (usersErr) throw usersErr;

	// 3. Assign one of the donations to the giver
	const { data: donations, error: dErr } = await supabase.from('donations').select('id').limit(1);

	if (dErr) throw dErr;
	if (donations.length > 0) {
		const donationId = donations[0].id;
		await supabase.from('donations').update({ giver_id: giver.user.id }).eq('id', donationId);
	}

	console.log('✅ Seed complete!');
}

seed().catch((e) => {
	console.error('❌ Seed failed:', e);
});
