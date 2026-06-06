import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/visual-lab/traversal', destination: '/visual-lab/reverse-array' },
      { source: '/visual-lab/insert', destination: '/visual-lab/move-zeroes' },
      { source: '/visual-lab/delete', destination: '/visual-lab/remove-duplicates' },
      { source: '/visual-lab/searching', destination: '/visual-lab/binary-search' },
      { source: '/visual-lab/sorting', destination: '/visual-lab/bubble-sort' },
      { source: '/visual-lab/two-pointer', destination: '/visual-lab/two-sum-sorted' },
      { source: '/visual-lab/prefix-sum', destination: '/visual-lab/max-sum-size-k' },
    ];
  },
};

export default nextConfig;
