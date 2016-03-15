<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

  <?php the_post_thumbnail('full'); ?>

  <header class="article-header text-center">
    <span class="entry-categories"><?php the_category(', ') ?></span>
    <h1 class="entry-title single-title" itemprop="headline"><?php the_title(); ?></h1>
  </header> <!-- end article header -->

  <section class="entry-content" itemprop="articleBody">
    <?php the_content(); ?>
  </section> <!-- end article section -->

  <footer class="article-footer">
    <?php get_template_part( 'parts/content', 'byline' ); ?>
    <p class="tags"><?php the_tags('<span class="tags-title">' . __( 'Tags:', 'jointswp' ) . '</span> ', ', ', ''); ?></p>
  </footer> <!-- end article footer -->

  <?php comments_template(); ?>

</article> <!-- end article -->
