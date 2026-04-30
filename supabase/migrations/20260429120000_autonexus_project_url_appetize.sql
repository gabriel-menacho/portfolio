-- Point AutoNexus project card at Appetize app URL (embed not available on free tier).

update public.projects
set
  url = 'https://appetize.io/app/b_gjfas3mp4lxawzvyend337tsaq'
where
  id = 'd4444444-4444-4444-8444-444444444444'::uuid;
