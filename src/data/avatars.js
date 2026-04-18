// Avatares surferos predefinidos
const avatars = [
  {
    id: 'turtle',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#5AACA8"/><ellipse cx="40" cy="42" rx="14" ry="17" stroke="#fff" stroke-width="2" fill="none"/><circle cx="40" cy="42" r="6" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="40" cy="42" r="2.5" fill="#fff"/><ellipse cx="40" cy="28" rx="4" ry="3" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M28 33q-7-5-9-2-2 3 3 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M52 33q7-5 9-2 2 3-3 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M28 51q-5 4-4 6 2 2 5-1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M52 51q5 4 4 6-2 2-5-1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  },
  {
    id: 'wave',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#C2714F"/><path d="M12 45q7-8 14 0t14 0 14 0 14 0" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M12 53q7-8 14 0t14 0 14 0 14 0" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/><circle cx="40" cy="28" r="8" fill="#F7DC6F" opacity="0.9"/></svg>`,
  },
  {
    id: 'surfboard',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#E07A6B"/><path d="M40 15q-4 0-5 8-1 10 0 25 1 12 5 17 4-5 5-17 1-15 0-25-1-8-5-8z" fill="#FFF8F0" stroke="#fff" stroke-width="1"/><line x1="40" y1="20" x2="40" y2="60" stroke="#C2714F" stroke-width="1" opacity="0.5"/><circle cx="40" cy="35" r="3" fill="#5AACA8" opacity="0.7"/></svg>`,
  },
  {
    id: 'sun',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#F5B971"/><circle cx="40" cy="38" r="12" fill="#F7DC6F" stroke="#fff" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="40" y1="60" x2="40" y2="56" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="22" y1="38" x2="18" y2="38" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="62" y1="38" x2="58" y2="38" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="27" y1="25" x2="24" y2="22" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="53" y1="25" x2="56" y2="22" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="27" y1="51" x2="24" y2="54" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="53" y1="51" x2="56" y2="54" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M15 58q12-4 25 0t25 0" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/></svg>`,
  },
  {
    id: 'shell',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#D4956F"/><path d="M25 50q15-35 30 0" stroke="#fff" stroke-width="2" fill="none"/><path d="M28 48q12-25 24 0" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.7"/><path d="M31 46q9-17 18 0" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/><line x1="40" y1="28" x2="40" y2="50" stroke="#fff" stroke-width="1" opacity="0.4"/><path d="M22 50q18 4 36 0" stroke="#fff" stroke-width="2" fill="none"/></svg>`,
  },
  {
    id: 'palm',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#3D8B87"/><path d="M38 60V32" stroke="#D4956F" stroke-width="2.5" stroke-linecap="round"/><path d="M38 32q-15-5-20 2" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M38 32q-10-12-5-18" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M38 32q5-14 12-15" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M38 32q15-3 20 5" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M38 32q12 0 18 8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M15 62q12-4 25 0t25 0" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4"/></svg>`,
  },
  {
    id: 'hibiscus',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#E07A6B"/><path d="M40 25q-5-8-12-5-6 4 0 10" stroke="#FFF8F0" stroke-width="2" fill="#fff" fill-opacity="0.3"/><path d="M40 25q2-9 9-8 7 2 3 10" stroke="#FFF8F0" stroke-width="2" fill="#fff" fill-opacity="0.3"/><path d="M40 25q9 1 12 7 2 7-6 6" stroke="#FFF8F0" stroke-width="2" fill="#fff" fill-opacity="0.3"/><path d="M40 25q6 7 3 13-4 6-10 1" stroke="#FFF8F0" stroke-width="2" fill="#fff" fill-opacity="0.3"/><path d="M40 25q-4 8-10 8-7-1-5-8" stroke="#FFF8F0" stroke-width="2" fill="#fff" fill-opacity="0.3"/><circle cx="40" cy="28" r="4" fill="#F7DC6F"/><path d="M35 42q-3 8-8 12" stroke="#5a9a6b" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M32 48q-5 1-8 4" stroke="#5a9a6b" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M30 50q2 4 0 8" stroke="#5a9a6b" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  },
  {
    id: 'conch',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#F5B971"/><path d="M50 28q5 8 4 16-2 8-10 12-8 3-16-2-6-5-6-14 1-10 8-14 8-5 14-1" stroke="#fff" stroke-width="2" fill="none"/><path d="M50 28q-3 5-8 7-5 1-8-2" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M46 36q-2 5-7 6-4 1-7-3" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.7"/><path d="M43 43q-1 4-5 5-4 0-5-3" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M22 54q3-2 6-1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="54" cy="26" r="1.5" fill="#fff" opacity="0.5"/></svg>`,
  },
]

export default avatars
