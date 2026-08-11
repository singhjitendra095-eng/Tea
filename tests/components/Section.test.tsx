import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '../../src/components/Section/Section';

describe('Section Component', () => {
  it('renders children content', () => {
    render(<Section>Test content</Section>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Section title="Test Title">Content</Section>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies light background by default', () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-tea-50');
  });

  it('applies dark background when specified', () => {
    const { container } = render(<Section background="dark">Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-charcoal-900');
    expect(section).toHaveClass('text-white');
  });

  it('applies no background when specified', () => {
    const { container } = render(<Section background="none">Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-transparent');
  });

  it('applies custom className', () => {
    const { container } = render(<Section className="custom-class">Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('sets id attribute when provided', () => {
    const { container } = render(<Section id="test-section">Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('px-4');
    expect(section).toHaveClass('md:px-8');
    expect(section).toHaveClass('lg:px-16');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-24');
    expect(section).toHaveClass('lg:py-32');
  });

  it('renders title with correct styling classes', () => {
    render(<Section title="Test Title">Content</Section>);
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-3xl');
    expect(title).toHaveClass('md:text-4xl');
    expect(title).toHaveClass('font-serif');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('mb-12');
    expect(title).toHaveClass('text-center');
  });
});