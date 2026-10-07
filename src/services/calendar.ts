/**
 * Calendar utilities for Favour Chisimdi Nwobodo's 48-Hour French Language Marathon
 * Generates Google Calendar web links and downloadable RFC-5545 .ics files.
 */

export interface CalendarEventPayload {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO 8601 string or Date format
  endDate: string;
}

export const OFFICIAL_MILESTONES: Record<string, CalendarEventPayload> = {
  fullMarathon: {
    title: "Favour Chisimdi Nwobodo's 48-Hour French Language Marathon (Guinness Record Attempt)",
    description: "48-Hour French lesson marathon by Nigerian polyglot Favour Chisimdi Nwobodo aiming for the Guinness World Records title for the longest language lesson. Free entry! Drop in anytime. Landmark Centre, Lagos, Nigeria.",
    location: "Landmark Centre, Plot 2 & 3 Water Corporation Dr, Victoria Island, Lagos, Nigeria",
    startDate: "2026-10-30T10:00:00+01:00",
    endDate: "2026-11-01T18:00:00+01:00",
  },
  sendOff: {
    title: "The Send-Off: Favour Chisimdi Nwobodo's 48-Hour French Marathon",
    description: "Music, comedy, spoken word, French, and Lagos energy. Come and send Favour Chisimdi Nwobodo into the 48-hour marathon!",
    location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    startDate: "2026-10-30T10:00:00+01:00",
    endDate: "2026-10-30T15:00:00+01:00",
  },
  clockStarts: {
    title: "The Clock Starts: 48-Hour French Language Marathon",
    description: "The 48-hour Guinness World Records challenge officially begins as Favour takes the lectern.",
    location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    startDate: "2026-10-30T18:00:00+01:00",
    endDate: "2026-10-30T21:00:00+01:00",
  },
  hour26: {
    title: "Hour 26: The Current Guinness Record Falls",
    description: "The current 26-hour world record mark is reached. As Favour continues into the night, history is broken!",
    location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    startDate: "2026-10-31T20:00:00+01:00",
    endDate: "2026-10-31T23:00:00+01:00",
  },
  hour48: {
    title: "Hour 48: The Final Bell & Victory Celebration",
    description: "The 48th hour and final bell of the marathon. The official lesson concludes and Lagos celebrates the Guinness World Record!",
    location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    startDate: "2026-11-01T17:00:00+01:00",
    endDate: "2026-11-01T20:00:00+01:00",
  }
};

function formatIsoToGCal(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

export function generateGoogleCalendarUrl(event: CalendarEventPayload): string {
  const start = formatIsoToGCal(event.startDate);
  const end = formatIsoToGCal(event.endDate);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
    add: 'info@ugegbegwr.com',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateIcsContent(event: CalendarEventPayload): string {
  const start = formatIsoToGCal(event.startDate);
  const end = formatIsoToGCal(event.endDate);
  const now = formatIsoToGCal(new Date().toISOString());
  const uid = `ugegbe-gwr-${Date.now()}@ugegbegwr.com`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ugegbe GWR//French Language Marathon//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcsFile(event: CalendarEventPayload, filename = 'ugegbe-marathon.ics') {
  const ics = generateIcsContent(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
