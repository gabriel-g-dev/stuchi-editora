import { IsDateString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePodcastDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty() // Can be an iframe string or URL, usually just URL if strictly url, but youtube embeds are sometimes iframes. User said "youtubeEmbedUrl" - assuming URL.
    @IsUrl()
    youtubeEmbedUrl: string;

    @IsDateString()
    publishedAt: string; // ISO 8601 string
}
