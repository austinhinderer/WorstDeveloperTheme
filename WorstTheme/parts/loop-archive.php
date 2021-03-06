<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article">

  <a href="<?php the_permalink() ?>"><?php the_post_thumbnail('full'); ?></a>

  <header class="article-header text-center">
    <span class="entry-categories"><?php the_category(', ') ?></span>
    <h2 class="entry-title"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
  </header> <!-- end article header -->

  <section class="entry-content" itemprop="articleBody">
    <?php the_content('<button class="tiny">' . __( 'Read more...', 'jointswp' ) . '</button>'); ?>
  </section> <!-- end article section -->

  <footer class="article-footer">
      <p class="tags"><?php the_tags('<span class="tags-title">' . __('Tags:', 'jointstheme') . '</span> ', ', ', ''); ?></p>
  </footer> <!-- end article footer -->

</article> <!-- end article -->
